"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Eye,
  Radar,
  Loader2,
  AlertTriangle,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";

const formatNum = (num) => {
  if (!num && num !== 0) return "--";
  return Number(num).toLocaleString();
};

const clampBar = (num) => Math.max(0, Math.min(100, Number(num || 0)));

const ScoreBar = ({ label, value }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
    <div className="mb-2 flex items-center justify-between">
      <p className="text-xs uppercase tracking-[0.22em] text-white/40">
        {label}
      </p>
      <p className="text-sm font-semibold text-emerald-200">
        {value ?? 0}/100
      </p>
    </div>
    <div className="h-2 overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-emerald-300"
        style={{ width: `${clampBar(value)}%` }}
      />
    </div>
  </div>
);

export default function TokenPage() {
  const params = useParams();
  const contract = params?.contract ? decodeURIComponent(params.contract) : "";

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const runCheck = async () => {
      if (!contract) return;

      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/signal-check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contract }),
        });

        const json = await response.json();

        if (!json.success) {
          setError(json.error || "Unable to analyze token.");
        } else {
          setData(json.result);
        }
      } catch (err) {
        setError("Token intelligence route failed.");
      }

      setLoading(false);
    };

    runCheck();
  }, [contract]);

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,170,0.18),transparent_34%),radial-gradient(circle_at_78%_16%,rgba(255,255,255,0.08),transparent_17%),radial-gradient(circle_at_12%_78%,rgba(0,180,140,0.14),transparent_25%)]" />
      <div className="fixed inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative mx-auto max-w-6xl px-6 py-8">
        <header className="flex items-center justify-between rounded-3xl border border-white/10 bg-black/50 px-5 py-4 shadow-2xl shadow-emerald-500/10 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10">
              <Eye className="h-5 w-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                TRUST THE SIGNAL
              </p>
              <h1 className="text-lg font-semibold tracking-[0.2em]">
                TOKEN INTELLIGENCE
              </h1>
            </div>
          </div>

          <a
            href="/trending"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 hover:border-emerald-300/30 hover:text-white"
          >
            <span className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Trending
            </span>
          </a>
        </header>

        <section className="pt-16">
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-300">
            Contract Route
          </p>
          <h2 className="mt-2 break-all text-3xl font-semibold md:text-5xl">
            {contract || "Loading contract..."}
          </h2>
        </section>

        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="flex items-center gap-3 text-emerald-300">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Running live token intelligence...</span>
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="mt-10 rounded-3xl border border-red-400/20 bg-red-400/10 p-6 text-red-100">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          </div>
        )}

        {!loading && data && (
          <>
            <section className="grid gap-4 pt-12 md:grid-cols-3">
              {[
                ["Token", `${data.name} (${data.symbol})`],
                ["Verdict", data.verdict],
                ["Signal", data.signal],
                ["Risk", data.risk],
                ["DEX", data.dex],
                ["Source Health", data.sourceHealth],
                ["Liquidity", `$${formatNum(data.liquidity)}`],
                ["24H Volume", `$${formatNum(data.volume24h)}`],
                ["Market Cap", `$${formatNum(data.marketCap)}`],
                ["24H Change", `${data.priceChange24h}%`],
                ["Pair Age", data.pairAge],
                ["Final Score", `${data.score}/100`],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                    {label}
                  </p>
                  <p className="mt-2 break-words text-lg font-medium text-emerald-200">
                    {value || "--"}
                  </p>
                </div>
              ))}
            </section>

            <section className="grid gap-4 pt-10 md:grid-cols-2">
              <ScoreBar label="Liquidity" value={data.breakdown?.liquidity} />
              <ScoreBar label="Volume" value={data.breakdown?.volume} />
              <ScoreBar label="Balance" value={data.breakdown?.liquidityBalance} />
              <ScoreBar label="Momentum" value={data.breakdown?.momentum} />
              <ScoreBar label="Age" value={data.breakdown?.age} />
              <ScoreBar label="Transactions" value={data.breakdown?.transactions} />
              <ScoreBar label="Metadata" value={data.breakdown?.metadata} />
            </section>

            <section className="pt-10">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="mb-3 text-xs uppercase tracking-[0.24em] text-white/45">
                  Risk Flags
                </p>

                {data.riskFlags?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {data.riskFlags.map((flag) => (
                      <span
                        key={flag}
                        className="rounded-full border border-yellow-400/25 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-100"
                      >
                        {flag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-emerald-200">
                    No major automated risk flags detected.
                  </p>
                )}
              </div>
            </section>

            <section className="pt-10">
              <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6">
                <div className="mb-3 flex items-center gap-2 text-emerald-300">
                  <Radar className="h-5 w-5" />
                  <p className="text-sm uppercase tracking-[0.24em]">
                    Token Intelligence Verdict
                  </p>
                </div>

                <p className="text-lg leading-8 text-white/75">
                  This token has been processed through the live Trust The Signal
                  authority engine using weighted liquidity, volume, age,
                  transaction, metadata, and structure interpretation.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  {data.pairUrl && (
                    <a
                      href={data.pairUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-2xl bg-emerald-400 px-5 py-3 font-semibold text-black"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open DexScreener Pair
                    </a>
                  )}

                  <a
                    href={`/?contract=${encodeURIComponent(contract)}`}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white/75 hover:border-emerald-300/30 hover:text-white"
                  >
                    Run On Homepage
                  </a>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}