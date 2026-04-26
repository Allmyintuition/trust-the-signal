import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const ALLOWED_LABELS = [
    "watch",
    "high_interest",
    "revisit",
    "dead",
    "premium_candidate",
];

export async function PATCH(request) {
    try {
        const supabase = getSupabaseAdmin();
        const body = await request.json();

        const id = String(body.id || "").trim();
        const operatorNote = String(body.operator_note || "").trim();
        const operatorLabel = String(body.operator_label || "watch").trim();

        if (!id) {
            return NextResponse.json(
                { success: false, error: "Missing token log id." },
                { status: 400 }
            );
        }

        if (!ALLOWED_LABELS.includes(operatorLabel)) {
            return NextResponse.json(
                { success: false, error: "Invalid operator label." },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from("token_logs")
            .update({
                operator_note: operatorNote,
                operator_label: operatorLabel,
            })
            .eq("id", id)
            .select("*")
            .single();

        if (error) throw error;

        return NextResponse.json({
            success: true,
            log: data,
        });
    } catch (error) {
        console.error("Token notes PATCH error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to update operator notes.",
            },
            { status: 500 }
        );
    }
}