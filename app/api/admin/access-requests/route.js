import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "access-requests.json");

export async function GET() {
    try {
        if (!fs.existsSync(dataFilePath)) {
            fs.writeFileSync(dataFilePath, "[]", "utf8");
        }

        const raw = fs.readFileSync(dataFilePath, "utf8");
        const requests = JSON.parse(raw || "[]");

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