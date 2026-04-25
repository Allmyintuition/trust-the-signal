import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const isValidContact = (value) => {
    if (!value || typeof value !== "string") return false;

    const trimmed = value.trim();

    if (trimmed.length < 3) return false;
    if (trimmed.length > 160) return false;

    return true;
};

const dataFilePath = path.join(process.cwd(), "data", "access-requests.json");

const readStoredRequests = () => {
    try {
        if (!fs.existsSync(dataFilePath)) {
            fs.writeFileSync(dataFilePath, "[]", "utf8");
        }

        const raw = fs.readFileSync(dataFilePath, "utf8");
        return JSON.parse(raw || "[]");
    } catch {
        return [];
    }
};

const saveStoredRequests = (requests) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(requests, null, 2), "utf8");
};

export async function POST(req) {
    try {
        const body = await req.json();

        const contact = body?.contact?.trim();
        const source = body?.source || "unknown";
        const contract = body?.contract || null;

        if (!isValidContact(contact)) {
            return NextResponse.json(
                {
                    success: false,
                    error:
                        "Enter a valid email, Telegram handle, Discord name, or preferred contact.",
                },
                { status: 400 }
            );
        }

        const payload = {
            id: `AR-${Date.now()}`,
            contact,
            source,
            contract,
            createdAt: new Date().toISOString(),
            brand: "Trust The Signal",
            status: "new_access_request",
        };

        const existing = readStoredRequests();
        const updated = [payload, ...existing].slice(0, 500);

        saveStoredRequests(updated);

        const webhookUrl = process.env.ACCESS_REQUEST_WEBHOOK_URL;

        if (webhookUrl) {
            await fetch(webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
        }

        console.log("[ACCESS REQUEST SAVED]", payload);

        return NextResponse.json({
            success: true,
            result: payload,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: "Access request failed. Try again.",
            },
            { status: 500 }
        );
    }
}
