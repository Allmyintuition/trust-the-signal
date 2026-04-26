import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const ALLOWED_STATUSES = [
    "new_access_request",
    "reviewing",
    "contacted",
    "accepted",
    "archived",
];

function mapRequest(row) {
    return {
        id: row.id,
        contact: row.contact || "",
        email: row.email || "",
        telegram: row.telegram || "",
        wallet: row.wallet || "",
        status: row.status || "new_access_request",
        source: row.source || "",
        message: row.message || "",
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

function escapeCSV(value) {
    if (value === null || value === undefined) return "";
    return `"${String(value).replace(/"/g, '""')}"`;
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
        headers.map((key) => escapeCSV(request[key] || "")).join(",")
    );

    return [headers.join(","), ...rows].join("\n");
}

export async function GET(request) {
    try {
        const supabase = getSupabaseAdmin();
        const { searchParams } = new URL(request.url);
        const format = searchParams.get("format");

        const { data, error } = await supabase
            .from("access_requests")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;

        const requests = Array.isArray(data) ? data.map(mapRequest) : [];

        if (format === "csv") {
            const csv = generateCSV(requests);

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
            total: requests.length,
            requests,
        });
    } catch (error) {
        console.error("Admin access requests GET error:", error);

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
        const supabase = getSupabaseAdmin();
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

        if (!ALLOWED_STATUSES.includes(status)) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid status.",
                },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from("access_requests")
            .update({
                status,
                updated_at: new Date().toISOString(),
            })
            .eq("id", id)
            .select("*")
            .single();

        if (error) throw error;

        return NextResponse.json({
            success: true,
            request: mapRequest(data),
        });
    } catch (error) {
        console.error("Admin access requests PATCH error:", error);

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
        const supabase = getSupabaseAdmin();
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

        const { error } = await supabase
            .from("access_requests")
            .delete()
            .eq("id", id);

        if (error) throw error;

        return NextResponse.json({
            success: true,
            deletedId: id,
        });
    } catch (error) {
        console.error("Admin access requests DELETE error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to delete access request.",
            },
            { status: 500 }
        );
    }
}