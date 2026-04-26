"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ShieldAlert,
    ArrowLeft,
    CheckCircle2,
    AlertTriangle,
    Lock,
    Radar,
    Loader2,
    Search,
} from "lucide-react";

const checks = [
    "Liquidity strength and liquidity-to-market-cap balance",
    "Source presence and metadata confidence",
    "Buy/sell pressure and transaction imbalance",
    "Volume-to-liquidity spike behavior",
    "Extremely new pair caution logic",
    "Thin-liquidity pump warning layer",
];

export default function RugRiskToolPage() {
    const [contract, setContract] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    async function runCheck() {
        if (!contract.trim()) return;

        try {
            setLoading(true);
            setError("");
            setResult(null);

            const response = await fetch("/api/signal-check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contract: contract.trim(),
                }),
            });

            const data = await response.json();

            if (!data.success) {
                setError(data.error || "Unable to analyze contract.");
            } else {
                setResult(data.result);
            }
        } catch (err) {
            setError("Rug risk engine failed.");
        } finally {
            setLoading(false);
        }
    }

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
                            RUG RISK CHECKER
                        </h1>
                    </div>

                    <div className="flex gap-3">
                        <Link
                            href="/tools"
                            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 hover:border-emerald-300/30"
                        >
                            Tools
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
                        <ShieldAlert className="h-5 w-5" />
                        <p className="text-sm uppercase tracking-[0.28em]">
                            Live Rug Filter Engine
                        </p>
                    </div>

                    <h2 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
                        Run direct structural risk analysis.
                    </h2>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-white/65">
                        This route uses the Trust The Signal scoring engine to inspect
                        liquidity strength, source confidence, market behavior, and risk flags.
                    </p>

                    <div className="mt-7 flex flex-col gap-4 md:flex-row">
                        <input
                            value={contract}
                            onChange={(e) => setContract(e.target.value)}
                            placeholder="Paste Solana contract address..."
                            className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm outline-none placeholder:text-white/30 focus:border-emerald-300/40"
                        />

                        <button
                            onClick={runCheck}
                            disabled={loading}
                            className="rounded-2xl bg-emerald-400 px-6 py-4 text-sm font-black text-black hover:bg-emerald-300 disabled:opacity-60"
                        >
                            {loading ? (
                                <span className="inline-flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Analyzing
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-2">
                                    <Search className="h-4 w-4" />
                                    Run Rug Check
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="mt-8 rounded-2xl border border-red-400/20 bg-red-400/10 p-5 text-red-100">
                        {error}
                    </div>
                )}

                {result && (
                    <div className="mt-8 grid gap-5 lg:grid-cols-2">
                        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
                            <p className="text-xs uppercase tracking-[0.22em] text-emerald-300">
                                Risk Result
                            </p>
                            <h3 className="mt-3 text-3xl font-black">{result.risk}</h3>
                            <p className="mt-3 text-white/65">Verdict: {result.verdict}</p>
                            <p className="mt-2 text-white/65">Score: {result.score}</p>
                            <p className="mt-2 text-white/65">Liquidity: ${Number(result.liquidity || 0).toLocaleString()}</p>
                            <p className="mt-2 text-white/65">24H Volume: ${Number(result.volume24h || 0).toLocaleString()}</p>
                        </div>

                        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
                            <div className="mb-4 flex items-center gap-2 text-emerald-300">
                                <Radar className="h-5 w-5" />
                                <p className="text-sm uppercase tracking-[0.24em]">
                                    Risk Checks Applied
                                </p>
                            </div>

                            <div className="grid gap-3">
                                {checks.map((check) => (
                                    <div
                                        key={check}
                                        className="rounded-2xl border border-white/10 bg-black/35 p-4 text-sm leading-7 text-white/70"
                                    >
                                        {check}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {Array.isArray(result.riskFlags) && result.riskFlags.length > 0 && (
                            <div className="lg:col-span-2 rounded-[1.75rem] border border-emerald-300/20 bg-emerald-300/10 p-6">
                                <div className="mb-4 flex items-center gap-2 text-emerald-300">
                                    <AlertTriangle className="h-5 w-5" />
                                    <p className="text-sm uppercase tracking-[0.24em]">
                                        Active Risk Flags
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {result.riskFlags.map((flag) => (
                                        <span
                                            key={flag}
                                            className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white/75"
                                        >
                                            {flag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </section>
        </main>
    );
}