"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  Database,
  ExternalLink,
  Loader2,
  ShieldCheck,
} from "lucide-react";

function formatNumber(value) {
  if (value === null || value === undefined || value === "") return "—";

  const num = Number(value);
  if (Number.isNaN(num)) return value;

  if (num >= 1000000000) return `$${(num / 1000000000).toFixed(2)}B`;
  if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
  if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;

  return `$${num.toFixed(2)}`;
}

function receiptTone(type) {
  const map = {
    operator_high_interest:
      "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
    strong_signal:
      "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
    caution_signal:
      "border-yellow-300/30 bg-yellow-300/10 text-yellow-200",
    risk_blocked:
      "border-red-300/30 bg-red-300/10 text-red-200",
    archived_signal:
      "border-cyan-300/25 bg-cyan-300/10 text-cyan-200",
  };

  return map[type] || "border-white/10 bg-white/5 text-white/60";
}

export default function ReceiptsPage() {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadReceipts() {
    try {
      setLoading(true);

      const response = await fetch("/api/signal-receipts", {
        cache: "no-store",
      });

      const data = await response.json();

      if (data.success) {
        setReceipts(data.receipts || []);
      }
    } catch (error) {
      console.error("Failed to load signal receipts:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReceipts();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,170,0.16),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.07),transparent_18%)]" />

      <section className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <header className="mb-10 flex items-center justify-between rounded-3xl border border-white/10 bg-black/50 px-5 py-4 backdrop-blur-2xl">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/45">
              TRUST THE SIGNAL
            </p>
            <h1 className="text-lg font-semibold tracking-[0.2em]">
              SIGNAL RECEIPTS
            </h1>
          </div>

          <div className="flex gap-3">
            <Link
              href="/tools/token-memory"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 hover:border-emerald-300/30"
            >
              Memory
            </Link>

            <Link
              href="/"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 hover:border-emerald-300/30"
            >
              <span className="inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Home
              </span>
            </Link>
          </div>
        </header>

        <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-black to-emerald-900/20 p-6 shadow-[0_0_80px_rgba(16,185,129,0.12)] sm:p-8">
          <div className="mb-4 flex items-center gap-2 text-emerald-300">
            <ShieldCheck className="h-5 w-5" />
            <p className="text-sm uppercase tracking-[0.28em]">
              Authority Proof Archive
            </p>
          </div>

          <h2 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            Recent intelligence receipts from platform memory.
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-8 text-white/65">
            Signal Receipts surface recent token checks, risk classifications,
            operator labels, repeated demand, and archived intelligence trails.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-white/35">
              Receipts
            </p>
            <p className="mt-3 text-4xl font-black">{receipts.length}</p>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-white/35">
              Source
            </p>
            <p className="mt-3 text-2xl font-black text-emerald-300">
              Token Logs
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-white/35">
              Mode
            </p>
            <p className="mt-3 text-2xl font-black text-emerald-300">
              Proof Layer
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5">
          {loading ? (
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8 text-center text-white/45">
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading receipts...
              </span>
            </div>
          ) : receipts.length === 0 ? (
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8 text-center text-white/45">
              No signal receipts archived yet.
            </div>
          ) : (
            receipts.map((receipt) => (
              <article
                key={receipt.id}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap gap-3">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.16em] ${receiptTone(
                          receipt.receiptType
                        )}`}
                      >
                        {receipt.receiptType}
                      </span>

                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-black text-white/60">
                        {receipt.checkCount || 0} checks
                      </span>

                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-black text-white/60">
                        {receipt.risk || "unknown risk"}
                      </span>
                    </div>

                    <h3 className="mt-4 text-3xl font-black">
                      {receipt.tokenName} ({receipt.tokenSymbol})
                    </h3>

                    <p className="mt-2 break-all font-mono text-xs text-white/40">
                      {receipt.contract}
                    </p>

                    <div className="mt-5 grid gap-3 text-sm md:grid-cols-4">
                      <p>
                        Score:{" "}
                        <span className="font-black">
                          {receipt.score ?? "—"}
                        </span>
                      </p>
                      <p>
                        MC:{" "}
                        <span className="font-black">
                          {formatNumber(receipt.marketCap)}
                        </span>
                      </p>
                      <p>
                        Liquidity:{" "}
                        <span className="font-black">
                          {formatNumber(receipt.liquidity)}
                        </span>
                      </p>
                      <p>
                        Volume:{" "}
                        <span className="font-black">
                          {formatNumber(receipt.volume24h)}
                        </span>
                      </p>
                    </div>

                    {receipt.operatorNote && (
                      <div className="mt-5 rounded-2xl border border-cyan-300/15 bg-cyan-300/5 p-4">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">
                          Operator Note
                        </p>
                        <p className="mt-2 text-sm leading-7 text-white/70">
                          {receipt.operatorNote}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/token/${receipt.contract}`}
                      className="rounded-2xl border border-emerald-300/25 bg-emerald-300/10 px-4 py-3 text-sm font-black text-emerald-200 hover:bg-emerald-300/20"
                    >
                      <span className="inline-flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Open Dossier
                      </span>
                    </Link>

                    <Link
                      href={`/tools/token-memory?q=${receipt.contract}`}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white/75 hover:border-emerald-300/30"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        Memory
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <section className="pb-10 pt-12">
          <div className="rounded-[1.75rem] border border-emerald-300/20 bg-emerald-300/10 p-6">
            <div className="flex items-start gap-3">
              <Activity className="mt-1 h-5 w-5 text-emerald-300" />
              <div>
                <h3 className="text-xl font-black">
                  Receipts turn intelligence into proof.
                </h3>
                <p className="mt-2 text-sm leading-7 text-white/65">
                  This archive becomes the public evidence layer for recent
                  checks, operator conviction, risk flags, and memory-backed
                  signal history.
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
