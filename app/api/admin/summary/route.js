import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET() {
    try {
        const supabase = getSupabaseAdmin();

        const { data: tokenLogs, error: tokenError } = await supabase
            .from("token_logs")
            .select("id, contract, token_name, token_symbol, check_count, latest_score, latest_risk, last_checked_at")
            .order("last_checked_at", { ascending: false })
            .limit(10);

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

        const totalChecks = Array.isArray(tokenLogs)
            ? tokenLogs.reduce((sum, log) => sum + Number(log.check_count || 0), 0)
            : 0;

        return NextResponse.json({
            success: true,
            summary: {
                tokenCount: tokenCount || 0,
                accessCount: accessCount || 0,
                newAccessCount: newAccessCount || 0,
                recentTokenLogs: tokenLogs || [],
                recentAccessRequests: accessRequests || [],
                recentVisibleChecks: totalChecks,
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