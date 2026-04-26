import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "token-logs.json");

async function ensureDataFile() {
    await fs.mkdir(DATA_DIR, { recursive: true });

    try {
        await fs.access(DATA_FILE);
    } catch {
        await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2), "utf8");
    }
}

async function readLogs() {
    await ensureDataFile();

    try {
        const raw = await fs.readFile(DATA_FILE, "utf8");
        const parsed = JSON.parse(raw);

        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error("Failed to read token logs:", error);
        return [];
    }
}

async function writeLogs(logs) {
    await ensureDataFile();
    await fs.writeFile(DATA_FILE, JSON.stringify(logs, null, 2), "utf8");
}

function normalizeContract(value) {
    return String(value || "").trim();
}

export async function POST(request) {
    try {
        const body = await request.json();

        const contract = normalizeContract(body.contract);
        const tokenName = String(body.tokenName || "").trim();
        const tokenSymbol = String(body.tokenSymbol || "").trim();

        if (!contract) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Missing token contract.",
                },
                { status: 400 }
            );
        }

        const logs = await readLogs();

        const now = new Date().toISOString();

        const existingIndex = logs.findIndex(
            (item) =>
                normalizeContract(item.contract).toLowerCase() ===
                contract.toLowerCase()
        );

        if (existingIndex >= 0) {
            logs[existingIndex] = {
                ...logs[existingIndex],
                tokenName: tokenName || logs[existingIndex].tokenName || "",
                tokenSymbol: tokenSymbol || logs[existingIndex].tokenSymbol || "",
                chain: body.chain || logs[existingIndex].chain || "solana",
                lastCheckedAt: now,
                checkCount: Number(logs[existingIndex].checkCount || 0) + 1,
                latestScore:
                    body.score !== undefined
                        ? body.score
                        : logs[existingIndex].latestScore || null,
                latestRisk: body.risk || logs[existingIndex].latestRisk || "",
                latestSetup: body.setup || logs[existingIndex].latestSetup || "",
                latestSource: body.source || logs[existingIndex].latestSource || "",
            };
        } else {
            logs.unshift({
                id: crypto.randomUUID(),
                contract,
                tokenName,
                tokenSymbol,
                chain: body.chain || "solana",
                firstCheckedAt: now,
                lastCheckedAt: now,
                checkCount: 1,
                latestScore: body.score !== undefined ? body.score : null,
                latestRisk: body.risk || "",
                latestSetup: body.setup || "",
                latestSource: body.source || "",
            });
        }

        const trimmedLogs = logs.slice(0, 1000);

        await writeLogs(trimmedLogs);

        return NextResponse.json({
            success: true,
            logged: true,
        });
    } catch (error) {
        console.error("Token log POST error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to log token.",
            },
            { status: 500 }
        );
    }
}