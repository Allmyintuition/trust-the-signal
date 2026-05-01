"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Lock,
  ShieldCheck,
  Eye,
  ArrowRight,
  CheckCircle2,
  Crown,
  RadioTower,
  KeyRound,
  Sparkles,
  Wallet,
} from "lucide-react";

const accessLayers = [
  "Protected signal rooms",
  "Private scanner updates",
  "Member intelligence notes",
  "Premium product drops",
  "Operator-only alerts",
  "Future gated dashboards",
];

const qualificationSignals = [
  "You actively check tokens before entering",
  "You care about avoiding low-quality noise",
  "You want tools, receipts, and structure in one place",
  "You are interested in premium guides, alerts, or private intelligence",
];

export default function ProtectedPage() {
  const [form, setForm] = useState({
    contact: "",
    email: "",
    telegram: "",
    wallet: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function updateField(key, value) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/access-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          source: "protected_access_page",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Submission failed.");
      }

      setSuccess(true);
      setForm({
        contact: "",
        email: "",
        telegram: "",
        wallet: "",
        message: "",
      });
    } catch (err) {
      setError(err.message || "Submission failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,170,0.16),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.07),transparent_18%)]" />

      <section className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <header className="mb-10 flex items-center justify-between rounded-3xl border border-white/10 bg-black/50 px-5 py-4 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10">
              <Eye className="h-5 w-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                TRUST THE SIGNAL
              </p>
              <h1 className="text-lg font-semibold tracking-[0.2em]">
                PROTECTED ACCESS
              </h1>
            </div>
          </div>

          <div className="hidden gap-3 sm:flex">
            <Link href="/" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 hover:border-emerald-300/30">
              Home
            </Link>
            <Link href="/products" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 hover:border-emerald-300/30">
              Products
            </Link>
          </div>
        </header>

        <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-black to-emerald-900/20 p-6 shadow-[0_0_80px_rgba(16,185,129,0.12)] sm:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-emerald-300">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em]">
              <Lock className="h-4 w-4" />
              Protected Operator Gateway
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-white/55">
              Intake Queue Open
            </span>
          </div>

          <h2 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            Reserved for deeper signal infrastructure.
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-8 text-white/65">
            Submit your operator details below for premium route placement, future private alerts, gated product releases, and member intelligence access.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-5 flex items-center gap-3 text-emerald-300">
              <KeyRound className="h-5 w-5" />
              <p className="text-xs font-black uppercase tracking-[0.25em]">
                Access Layers
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {accessLayers.map((layer) => (
                <div
                  key={layer}
                  className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5"
                >
                  <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                  <p className="mt-4 text-base font-bold">{layer}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-emerald-300/20 bg-emerald-300/10 p-6">
              <div className="mb-5 flex items-center gap-3 text-emerald-300">
                <Wallet className="h-5 w-5" />
                <p className="text-xs font-black uppercase tracking-[0.25em]">
                  Operator Fit
                </p>
              </div>

              <div className="grid gap-3">
                {qualificationSignals.map((signal) => (
                  <div key={signal} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
                    <p className="text-sm leading-7 text-white/70">{signal}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[1.75rem] border border-emerald-300/20 bg-emerald-300/10 p-6"
          >
            <div className="mb-5 flex items-center gap-3 text-emerald-300">
              <Sparkles className="h-5 w-5" />
              <p className="text-xs font-black uppercase tracking-[0.25em]">
                Submit Operator Intake
              </p>
            </div>

            <div className="grid gap-4">
              <input
                value={form.contact}
                onChange={(e) => updateField("contact", e.target.value)}
                placeholder="Name / Username"
                className="rounded-2xl border border-white/10 bg-black/50 px-4 py-4 text-sm outline-none placeholder:text-white/30"
              />

              <input
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="Email"
                className="rounded-2xl border border-white/10 bg-black/50 px-4 py-4 text-sm outline-none placeholder:text-white/30"
              />

              <input
                value={form.telegram}
                onChange={(e) => updateField("telegram", e.target.value)}
                placeholder="Telegram @username"
                className="rounded-2xl border border-white/10 bg-black/50 px-4 py-4 text-sm outline-none placeholder:text-white/30"
              />

              <input
                value={form.wallet}
                onChange={(e) => updateField("wallet", e.target.value)}
                placeholder="Solana Wallet (optional)"
                className="rounded-2xl border border-white/10 bg-black/50 px-4 py-4 text-sm outline-none placeholder:text-white/30"
              />

              <textarea
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                placeholder="Tell us what protected access, alerts, or tools interest you..."
                className="min-h-28 rounded-2xl border border-white/10 bg-black/50 px-4 py-4 text-sm outline-none placeholder:text-white/30"
              />

              {error && (
                <div className="rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm font-bold text-red-200">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-2xl border border-emerald-300/30 bg-emerald-300/10 p-4 text-sm font-bold text-emerald-200">
                  Intake submitted successfully. Your operator request has been queued.
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-6 py-4 text-sm font-black text-black hover:bg-emerald-300"
              >
                {loading ? "Submitting..." : "Secure Queue Placement"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 rounded-[1.75rem] border border-emerald-300/20 bg-emerald-300/10 p-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-1 h-5 w-5 text-emerald-300" />
            <div>
              <h3 className="text-xl font-black">
                This route now feeds the protected lead intelligence engine.
              </h3>
              <p className="mt-2 text-sm leading-7 text-white/65">
                Qualified submissions are scored, prioritized, tagged, and routed into the internal Trust The Signal operator intake terminal.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
