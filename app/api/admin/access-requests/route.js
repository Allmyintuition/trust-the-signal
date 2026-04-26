import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "access-requests.json");

async function ensureDataFile() {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });

        try {
            await fs.access(DATA_FILE);
        } catch {
            await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2), "utf8");
        }
    } catch (error) {
        console.error("Failed to ensure access request data file:", error);
    }
}

async function readRequests() {
    await ensureDataFile();

    try {
        const raw = await fs.readFile(DATA_FILE, "utf8");
        const parsed = JSON.parse(raw);

        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed;
    } catch (error) {
        console.error("Failed to read access requests:", error);
        return [];
    }
}

async function writeRequests(requests) {
    await ensureDataFile();
    await fs.writeFile(DATA_FILE, JSON.stringify(requests, null, 2), "utf8");
}

function escapeCSV(value) {
    if (value === null || value === undefined) return "";

    const stringValue = String(value);
    const escaped = stringValue.replace(/"/g, '""');

    return `"${escaped}"`;
}

function generateCSV(requests) {
    const headers = [
        "id",
        "contact",
        "email",
        "telegram",
        "wallet",
        "status",
        "source",
        "message",
        "createdAt",
        "updatedAt",
    ];

    const rows = requests.map((request) =>
        headers
            .map((key) => {
                if (key === "contact") {
                    return escapeCSV(
                        request.contact ||
                        request.email ||
                        request.telegram ||
                        request.wallet ||
                        ""
                    );
                }

                return escapeCSV(request[key] || "");
            })
            .join(",")
    );

    return [headers.join(","), ...rows].join("\n");
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const format = searchParams.get("format");

        const requests = await readRequests();

        const sortedRequests = [...requests].sort((a, b) => {
            const dateA = new Date(a.createdAt || 0).getTime();
            const dateB = new Date(b.createdAt || 0).getTime();
            return dateB - dateA;
        });

        if (format === "csv") {
            const csv = generateCSV(sortedRequests);

            return new NextResponse(csv, {
                status: 200,
                headers: {
                    "Content-Type": "text/csv; charset=utf-8",
                    "Content-Disposition": `attachment; filename="trust-the-signal-access-requests.csv"`,
                },
            });
        }

        return NextResponse.json({
            success: true,
            total: sortedRequests.length,
            requests: sortedRequests,
        });
    } catch (error) {
        console.error("Admin GET access requests error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to load access requests.",
            },
            { status: 500 }
        );
    }
}

export async function PATCH(request) {
    try {
        const body = await request.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Missing request id or status.",
                },
                { status: 400 }
            );
        }

        const allowedStatuses = [
            "new_access_request",
            "reviewing",
            "contacted",
            "accepted",
            "archived",
        ];

        if (!allowedStatuses.includes(status)) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid status.",
                },
                { status: 400 }
            );
        }

        const requests = await readRequests();

        const requestIndex = requests.findIndex((item) => item.id === id);

        if (requestIndex === -1) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Access request not found.",
                },
                { status: 404 }
            );
        }

        requests[requestIndex] = {
            ...requests[requestIndex],
            status,
            updatedAt: new Date().toISOString(),
        };

        await writeRequests(requests);

        return NextResponse.json({
            success: true,
            request: requests[requestIndex],
        });
    } catch (error) {
        console.error("Admin PATCH access request error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to update access request.",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Missing request id.",
                },
                { status: 400 }
            );
        }

        const requests = await readRequests();

        const filteredRequests = requests.filter((item) => item.id !== id);

        if (filteredRequests.length === requests.length) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Access request not found.",
                },
                { status: 404 }
            );
        }

        await writeRequests(filteredRequests);

        return NextResponse.json({
            success: true,
            deletedId: id,
            remaining: filteredRequests.length,
        });
    } catch (error) {
        console.error("Admin DELETE access request error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to delete access request.",
            },
            { status: 500 }
        );
    }
}