import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(request) {
    try {
        const supabase = getSupabaseAdmin();
        const { searchParams } = new URL(request.url);

        const query = String(searchParams.get("q") || "").trim();
        const limitValue = Number(searchParams.get("limit") || 25);
        const limit = Math.min(Math.max(limitValue, 1), 50);

        let builder = supabase
            .from("token_logs")
            .select(
                "id, contract, token_name, token_symbol, chain, check_count, latest_score, latest_risk, latest_setup, latest_source, market_cap, liquidity, volume_24h, risk_flags, verdict, operator_note, operator_label, last_checked_at"
            )
            .order("last_checked_at", { ascending: false })
            .limit(limit);

        if (query) {
            builder = builder.or(
                `contract.ilike.%${query}%,token_name.ilike.%${query}%,token_symbol.ilike.%${query}%,latest_risk.ilike.%${query}%`
            );
        }

        const { data, error } = await builder;

        if (error) throw error;

        return NextResponse.json({
            success: true,
            total: data?.length || 0,
            logs: data || [],
        });
    } catch (error) {
        console.error("Token memory GET error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to load token memory.",
                logs: [],
            },
            { status: 500 }
        );
    }
}