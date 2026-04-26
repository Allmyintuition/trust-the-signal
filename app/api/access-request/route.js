import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

function clean(value) {
    return String(value || "").trim();
}

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

export async function POST(request) {
    try {
        const supabase = getSupabaseAdmin();
        const body = await request.json();

        const contact = clean(body.contact);
        const email = clean(body.email);
        const telegram = clean(body.telegram);
        const wallet = clean(body.wallet);
        const source = clean(body.source || "protected_access");
        const message = clean(body.message);

        if (!contact && !email && !telegram && !wallet) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Add at least one contact method.",
                },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from("access_requests")
            .insert({
                contact,
                email,
                telegram,
                wallet,
                source,
                message,
                status: "new_access_request",
            })
            .select("*")
            .single();

        if (error) throw error;

        return NextResponse.json({
            success: true,
            request: mapRequest(data),
        });
    } catch (error) {
        console.error("Access request POST error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to submit access request.",
            },
            { status: 500 }
        );
    }
}