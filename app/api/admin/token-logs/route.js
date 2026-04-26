import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

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
        "token_name",
        "token_symbol",
        "chain",
        "check_count",
        "latest_score",
        "latest_risk",
        "latest_setup",
        "latest_source",
        "first_checked_at",
        "last_checked_at",
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

        const { data, error } = await supabase
            .from("token_logs")
            .select("*")
            .order("last_checked_at", { ascending: false });

        if (error) throw error;

        const logs = Array.isArray(data) ? data : [];

        if (format === "csv") {
            const csv = generateCSV(logs);

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
            total: logs.length,
            logs,
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