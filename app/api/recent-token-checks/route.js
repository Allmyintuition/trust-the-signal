import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("token_logs")
      .select("contract, token_name, token_symbol, latest_score, latest_risk, last_checked_at")
      .order("last_checked_at", { ascending: false })
      .limit(6);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      logs: data || [],
    });
  } catch (error) {
    console.error("Recent token checks GET error:", error);

    return NextResponse.json(
      {
        success: false,
        logs: [],
      },
      { status: 500 }
    );
  }
}