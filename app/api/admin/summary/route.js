import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

function receiptType(log) {
    const score = Number(log.latest_score || 0);
    const risk = String(log.latest_risk || "").toUpperCase();
    const label = String(log.operator_label || "").toLowerCase();

    if (label === "high_interest" || label === "premium_candidate") {
        return "operator_high_interest";
    }

    if (risk.includes("LOW") && score >= 75) return "strong_signal";
    if (risk.includes("MEDIUM") || risk.includes("CAUTION")) return "caution_signal";
    if (risk.includes("HIGH") || risk.includes("DANGER")) return "risk_blocked";

    return "archived_signal";
}

export async function GET() {
    try {
        const supabase = getSupabaseAdmin();

        const { data: tokenLogs, error: tokenError } = await supabase
            .from("token_logs")
            .select(
                "id, contract, token_name, token_symbol, check_count, latest_score, latest_risk, operator_label, operator_note, last_checked_at"
            )
            .order("last_checked_at", { ascending: false })
            .limit(25);

        if (tokenError) throw tokenError;

        const { data: accessRequests, error: accessError } = await supabase
            .from("access_requests")
            .select("id, contact, email, telegram, wallet, status, source, created_at")
            .order("created_at", { ascending: false })
            .limit(10);

        if (accessError) throw accessError;

        const { count: tokenCount, error: tokenCountError } = await supabase
            .from("token_logs")
            .select("*", { count: "exact", head: true });

        if (tokenCountError) throw tokenCountError;

        const { count: accessCount, error: accessCountError } = await supabase
            .from("access_requests")
            .select("*", { count: "exact", head: true });

        if (accessCountError) throw accessCountError;

        const { count: newAccessCount, error: newAccessCountError } = await supabase
            .from("access_requests")
            .select("*", { count: "exact", head: true })
            .eq("status", "new_access_request");

        if (newAccessCountError) throw newAccessCountError;

        const logs = tokenLogs || [];

        const totalChecks = logs.reduce(
            (sum, log) => sum + Number(log.check_count || 0),
            0
        );

        const strongReceiptCount = logs.filter(
            (log) => receiptType(log) === "strong_signal"
        ).length;

        const cautionReceiptCount = logs.filter(
            (log) => receiptType(log) === "caution_signal"
        ).length;

        const operatorMarked = logs.filter((log) => Boolean(log.operator_label)).length;

        const topChecked = [...logs].sort(
            (a, b) => Number(b.check_count || 0) - Number(a.check_count || 0)
        )[0];

        const labelCounts = logs.reduce((acc, log) => {
            const label = log.operator_label || "watch";
            acc[label] = (acc[label] || 0) + 1;
            return acc;
        }, {});

        return NextResponse.json({
            success: true,
            summary: {
                tokenCount: tokenCount || 0,
                accessCount: accessCount || 0,
                newAccessCount: newAccessCount || 0,
                recentTokenLogs: logs.slice(0, 10),
                recentAccessRequests: accessRequests || [],
                recentVisibleChecks: totalChecks,
                strongReceiptCount,
                cautionReceiptCount,
                operatorMarked,
                topCheckedToken: topChecked
                    ? `${topChecked.token_name || "Unknown"} (${topChecked.token_symbol || "?"})`
                    : null,
                labelCounts,
            },
        });
    } catch (error) {
        console.error("Admin summary GET error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to load admin summary.",
            },
            { status: 500 }
        );
    }
}