"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const included = [
  "How to read liquidity, volume, and market-cap structure",
  "How to identify safe vs caution vs dangerous setups",
  "Understanding fake momentum and thin-liquidity traps",
  "How to structure entries and avoid emotional chasing",
  "When to scale, when to trim, when to fully avoid",
  "Operator survival rules and execution discipline",
];

export default function SignalOperatorGuidePage() {
  const [form, setForm] = useState({
    contact: "",
    email: "",
    telegram: "",
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
          source: "signal_operator_guide_order",
          message: form.message || "Signal Operator Guide purchase request",
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
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/45">
              TRUST THE SIGNAL
            </p>
            <h1 className="text-lg font-semibold tracking-[0.2em]">
              SIGNAL OPERATOR GUIDE
            </h1>
          </div>

          <Link
            href="/products"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 hover:border-emerald-300/30"
          >
            <span className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Products
            </span>
          </Link>
        </header>

        <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-black to-emerald-900/20 p-6 shadow-[0_0_80px_rgba(16,185,129,0.12)] sm:p-8">
          <div className="mb-4 flex items-center gap-2 text-emerald-300">
            <BookOpen className="h-5 w-5" />
            <p className="text-sm uppercase tracking-[0.28em]">
              Premium Guide Delivery Route
            </p>
          </div>

          <h2 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            The foundation guide for structured token decision making.
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-8 text-white/65">
            Built for users who want more than random calls and blind entries.
            This guide is designed to teach practical structure, risk reading,
            disciplined setup interpretation, and long-term signal survival.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <span className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-black">
              $19 Digital Guide
            </span>

            <span className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white/70">
              Manual Fulfillment Active
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-4 flex items-center gap-2 text-emerald-300">
              <Sparkles className="h-5 w-5" />
              <p className="text-sm uppercase tracking-[0.24em]">
                Included Inside
              </p>
            </div>

            <div className="grid gap-3">
              {included.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 p-4"
                >
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                  <p className="text-sm leading-7 text-white/70">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-emerald-300/20 bg-emerald-300/10 p-6">
              <div className="flex items-start gap-3">
                <Lock className="mt-1 h-5 w-5 text-emerald-300" />
                <div>
                  <h3 className="text-xl font-black">
                    Buyer requests now route into admin fulfillment.
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-white/65">
                    Guide orders are captured, prioritized, and manually deliverable immediately while Stripe and automatic PDF delivery are staged later.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[1.75rem] border border-emerald-300/20 bg-emerald-300/10 p-6"
          >
            <div className="mb-5 flex items-center gap-3 text-emerald-300">
              <ArrowRight className="h-5 w-5" />
              <p className="text-xs font-black uppercase tracking-[0.25em]">
                Secure Guide Request
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

              <textarea
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                placeholder="Optional buyer note or delivery preference..."
                className="min-h-28 rounded-2xl border border-white/10 bg-black/50 px-4 py-4 text-sm outline-none placeholder:text-white/30"
              />

              {error && (
                <div className="rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm font-bold text-red-200">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-2xl border border-emerald-300/30 bg-emerald-300/10 p-4 text-sm font-bold text-emerald-200">
                  Guide request submitted. Delivery request is now in fulfillment queue.
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-6 py-4 text-sm font-black text-black hover:bg-emerald-300"
              >
                {loading ? "Submitting..." : "Submit Guide Order"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
