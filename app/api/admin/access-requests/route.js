import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "access-requests.json");

const ensureDataFile = () => {
    const dataDir = path.join(process.cwd(), "data");

    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    if (!fs.existsSync(dataFilePath)) {
        fs.writeFileSync(dataFilePath, "[]", "utf8");
    }
};

const readRequests = () => {
    ensureDataFile();

    try {
        const raw = fs.readFileSync(dataFilePath, "utf8");
        return JSON.parse(raw || "[]");
    } catch {
        return [];
    }
};

const writeRequests = (requests) => {
    ensureDataFile();
    fs.writeFileSync(dataFilePath, JSON.stringify(requests, null, 2), "utf8");
};

export async function GET() {
    try {
        const requests = readRequests();

        return NextResponse.json({
            success: true,
            total: requests.length,
            requests,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: "Unable to load stored requests.",
            },
            { status: 500 }
        );
    }
}

export async function PATCH(req) {
    try {
        const body = await req.json();
        const id = body?.id;
        const status = body?.status;

        if (!id || !status) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Request id and status are required.",
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

        const requests = readRequests();

        const updatedRequests = requests.map((request) =>
            request.id === id
                ? {
                    ...request,
                    status,
                    updatedAt: new Date().toISOString(),
                }
                : request
        );

        writeRequests(updatedRequests);

        return NextResponse.json({
            success: true,
            requests: updatedRequests,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: "Unable to update request.",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(req) {
    try {
        const body = await req.json();
        const id = body?.id;

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Request id is required.",
                },
                { status: 400 }
            );
        }

        const requests = readRequests();
        const updatedRequests = requests.filter((request) => request.id !== id);

        writeRequests(updatedRequests);

        return NextResponse.json({
            success: true,
            requests: updatedRequests,
            total: updatedRequests.length,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: "Unable to delete request.",
            },
            { status: 500 }
        );
    }
}