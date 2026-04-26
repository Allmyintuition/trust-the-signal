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

function escapeCSV(value) {
    if (value === null || value === undefined) return "";

    const stringValue = String(value);
    const escaped = stringValue.replace(/"/g, '""');

    return `"${escaped}"`;
}

function generateCSV(logs) {
    const headers = [
        "id",
        "contract",
        "tokenName",
        "tokenSymbol",
        "chain",
        "checkCount",
        "latestScore",
        "latestRisk",
        "latestSetup",
        "latestSource",
        "firstCheckedAt",
        "lastCheckedAt",
    ];

    const rows = logs.map((log) =>
        headers.map((key) => escapeCSV(log[key] || "")).join(",")
    );

    return [headers.join(","), ...rows].join("\n");
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const format = searchParams.get("format");

        const logs = await readLogs();

        const sortedLogs = [...logs].sort((a, b) => {
            const dateA = new Date(a.lastCheckedAt || a.firstCheckedAt || 0).getTime();
            const dateB = new Date(b.lastCheckedAt || b.firstCheckedAt || 0).getTime();
            return dateB - dateA;
        });

        if (format === "csv") {
            const csv = generateCSV(sortedLogs);

            return new NextResponse(csv, {
                status: 200,
                headers: {
                    "Content-Type": "text/csv; charset=utf-8",
                    "Content-Disposition": `attachment; filename="trust-the-signal-token-logs.csv"`,
                },
            });
        }

        return NextResponse.json({
            success: true,
            total: sortedLogs.length,
            logs: sortedLogs,
        });
    } catch (error) {
        console.error("Admin token logs GET error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to load token logs.",
            },
            { status: 500 }
        );
    }
}