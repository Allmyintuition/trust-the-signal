import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

function classifyReceipt(log) {
    const score = Number(log.latest_score || 0);
    const risk = String(log.latest_risk || "").toUpperCase();
    const label = String(log.operator_label || "").toLowerCase();

    if (label === "high_interest" || label === "premium_candidate") {
        return "operator_high_interest";
    }

    if (risk.includes("LOW") && score >= 75) {
        return "strong_signal";
    }

    if (risk.includes("MEDIUM") || risk.includes("CAUTION")) {
        return "caution_signal";
    }

    if (risk.includes("HIGH") || risk.includes("DANGER")) {
        return "risk_blocked";
    }

    return "archived_signal";
}

export async function GET() {
    try {
        const supabase = getSupabaseAdmin();

        const { data, error } = await supabase
            .from("token_logs")
            .select(
                "id, contract, token_name, token_symbol, latest_score, latest_risk, latest_setup, latest_source, operator_label, operator_note, market_cap, liquidity, volume_24h, check_count, last_checked_at"
            )
            .order("last_checked_at", { ascending: false })
            .limit(12);

        if (error) throw error;

        const receipts = (data || []).map((log) => ({
            id: log.id,
            contract: log.contract,
            tokenName: log.token_name || "Unknown Token",
            tokenSymbol: log.token_symbol || "TOKEN",
            score: log.latest_score,
            risk: log.latest_risk,
            setup: log.latest_setup,
            source: log.latest_source,
            operatorLabel: log.operator_label || "watch",
            operatorNote: log.operator_note || "",
            marketCap: log.market_cap,
            liquidity: log.liquidity,
            volume24h: log.volume_24h,
            checkCount: log.check_count || 0,
            lastCheckedAt: log.last_checked_at,
            receiptType: classifyReceipt(log),
        }));

        return NextResponse.json({
            success: true,
            total: receipts.length,
            receipts,
        });
    } catch (error) {
        console.error("Signal receipts error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to load signal receipts.",
                receipts: [],
            },
            { status: 500 }
        );
    }
}