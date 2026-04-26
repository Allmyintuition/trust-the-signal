import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

function normalizeContract(value) {
    return String(value || "").trim();
}

export async function POST(request) {
    try {
        const body = await request.json();

        const contract = normalizeContract(body.contract);
        const tokenName = String(body.tokenName || "").trim();
        const tokenSymbol = String(body.tokenSymbol || "").trim();

        if (!contract) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Missing token contract.",
                },
                { status: 400 }
            );
        }

        const { data: existing } = await supabase
            .from("token_logs")
            .select("*")
            .eq("contract", contract)
            .maybeSingle();

        if (existing) {
            const { error } = await supabase
                .from("token_logs")
                .update({
                    token_name: tokenName || existing.token_name || "",
                    token_symbol: tokenSymbol || existing.token_symbol || "",
                    chain: body.chain || existing.chain || "solana",
                    check_count: Number(existing.check_count || 0) + 1,
                    latest_score:
                        body.score !== undefined ? body.score : existing.latest_score,
                    latest_risk: body.risk || existing.latest_risk || "",
                    latest_setup: body.setup || existing.latest_setup || "",
                    latest_source: body.source || existing.latest_source || "",
                    last_checked_at: new Date().toISOString(),
                })
                .eq("contract", contract);

            if (error) throw error;
        } else {
            const { error } = await supabase.from("token_logs").insert({
                contract,
                token_name: tokenName,
                token_symbol: tokenSymbol,
                chain: body.chain || "solana",
                check_count: 1,
                latest_score: body.score !== undefined ? body.score : null,
                latest_risk: body.risk || "",
                latest_setup: body.setup || "",
                latest_source: body.source || "",
            });

            if (error) throw error;
        }

        return NextResponse.json({
            success: true,
            logged: true,
        });
    } catch (error) {
        console.error("Token log POST error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to log token.",
            },
            { status: 500 }
        );
    }
}