import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET() {
    try {
        const supabase = getSupabaseAdmin();

        const { count: tokenCount, error: tokenError } = await supabase
            .from("token_logs")
            .select("*", { count: "exact", head: true });

        if (tokenError) throw tokenError;

        const { count: accessCount, error: accessError } = await supabase
            .from("access_requests")
            .select("*", { count: "exact", head: true });

        if (accessError) throw accessError;

        const { data: recentLogs, error: recentError } = await supabase
            .from("token_logs")
            .select("check_count, latest_risk, latest_score, operator_label")
            .order("last_checked_at", { ascending: false })
            .limit(100);

        if (recentError) throw recentError;

        const logs = recentLogs || [];

        const totalChecks = logs.reduce(
            (sum, item) => sum + Number(item.check_count || 0),
            0
        );

        const safeRoutes = logs.filter((item) =>
            String(item.latest_risk || "").toUpperCase().includes("LOW")
        ).length;

        const cautionRoutes = logs.filter((item) => {
            const risk = String(item.latest_risk || "").toUpperCase();
            return risk.includes("MEDIUM") || risk.includes("CAUTION");
        }).length;

        const operatorMarked = logs.filter((item) => item.operator_label).length;

        return NextResponse.json({
            success: true,
            metrics: {
                contractsProcessed: tokenCount || 0,
                totalChecks,
                protectedQueue: accessCount || 0,
                safeRoutes,
                cautionRoutes,
                operatorMarked,
            },
        });
    } catch (error) {
        console.error("Platform metrics error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to load platform metrics.",
            },
            { status: 500 }
        );
    }
}