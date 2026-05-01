import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

function clean(value) {
  return String(value || "").trim();
}

function determineLeadType({ wallet, telegram, email, message }) {
  if (wallet && telegram) return "operator_candidate";
  if (wallet) return "wallet_trader";
  if (telegram) return "community_lead";
  if (email) return "email_lead";
  if (message) return "curious_user";
  return "general";
}

function determineLeadScore({ wallet, telegram, email, message }) {
  let score = 10;

  if (wallet) score += 30;
  if (telegram) score += 25;
  if (email) score += 15;
  if (message && message.length > 20) score += 20;

  if (wallet && telegram) score += 20;

  return score;
}

function determinePriority(score) {
  if (score >= 75) return "high";
  if (score >= 45) return "medium";
  return "normal";
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
    leadScore: row.lead_score || 0,
    leadType: row.lead_type || "general",
    operatorTag: row.operator_tag || "",
    adminNotes: row.admin_notes || "",
    outreachPriority: row.outreach_priority || "normal",
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

    const leadType = determineLeadType({ wallet, telegram, email, message });
    const leadScore = determineLeadScore({ wallet, telegram, email, message });
    const outreachPriority = determinePriority(leadScore);

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
        lead_type: leadType,
        lead_score: leadScore,
        outreach_priority: outreachPriority,
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
