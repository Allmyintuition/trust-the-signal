"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
    Database,
    ArrowLeft,
    Search,
    Loader2,
    ExternalLink,
    Copy,
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

function labelStyle(label) {
    const map = {
        watch: "border-cyan-300/25 bg-cyan-300/10 text-cyan-200",
        high_interest: "border-emerald-300/25 bg-emerald-300/10 text-emerald-200",
        revisit: "border-yellow-300/25 bg-yellow-300/10 text-yellow-200",
        dead: "border-red-300/25 bg-red-300/10 text-red-200",
        premium_candidate: "border-purple-300/25 bg-purple-300/10 text-purple-200",
    };

    return map[label] || "border-white/10 bg-white/5 text-white/60";
}

export default function TokenMemoryPage() {
    const [query, setQuery] = useState("");
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copiedId, setCopiedId] = useState("");

    async function loadMemory(searchValue = "") {
        try {
            setLoading(true);

            const params = new URLSearchParams();

            if (searchValue.trim()) {
                params.set("q", searchValue.trim());
            }

            const response = await fetch(`/api/token-memory?${params.toString()}`, {
                cache: "no-store",
            });

            const data = await response.json();

            if (data.success) {
                setLogs(data.logs || []);
            }
        } catch (error) {
            console.error("Token memory failed:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadMemory("");
    }, []);

    const totalChecks = useMemo(
        () => logs.reduce((sum, log) => sum + Number(log.check_count || 0), 0),
        [logs]
    );

    async function copyContract(id, contract) {
        if (!contract) return;

        await navigator.clipboard.writeText(contract);
        setCopiedId(id);

        setTimeout(() => {
            setCopiedId("");
        }, 1400);
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
                            TOKEN MEMORY
                        </h1>
                    </div>

                    <div className="flex gap-3">
                        <Link href="/tools" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                            Tools
                        </Link>

                        <Link href="/" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                            <span className="inline-flex items-center gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Home
                            </span>
                        </Link>
                    </div>
                </header>

                <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-black to-emerald-900/20 p-6 shadow-[0_0_80px_rgba(16,185,129,0.12)] sm:p-8">
                    <div className="mb-4 flex items-center gap-2 text-emerald-300">
                        <Database className="h-5 w-5" />
                        <p className="text-sm uppercase tracking-[0.28em]">
                            Hybrid Intelligence Memory
                        </p>
                    </div>

                    <h2 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
                        Search what the platform remembers + what the operator marked.
                    </h2>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-white/65">
                        Machine logs, repeated checks, dossier history, and manual conviction notes now live together inside one searchable archive.
                    </p>

                    <div className="mt-7 grid gap-4 lg:grid-cols-[1fr_180px]">
                        <input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") loadMemory(query);
                            }}
                            placeholder="Search token, symbol, contract, risk, notes..."
                            className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm outline-none"
                        />

                        <button
                            onClick={() => loadMemory(query)}
                            disabled={loading}
                            className="rounded-2xl bg-emerald-400 px-6 py-4 text-sm font-black text-black"
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : <span className="inline-flex items-center gap-2"><Search className="h-4 w-4" />Search</span>}
                        </button>
                    </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                    <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
                        <p className="text-xs font-black uppercase tracking-[0.25em] text-white/35">Results</p>
                        <p className="mt-3 text-4xl font-black">{logs.length}</p>
                    </div>

                    <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
                        <p className="text-xs font-black uppercase tracking-[0.25em] text-white/35">Visible Checks</p>
                        <p className="mt-3 text-4xl font-black">{totalChecks}</p>
                    </div>

                    <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
                        <p className="text-xs font-black uppercase tracking-[0.25em] text-white/35">Mode</p>
                        <p className="mt-3 text-2xl font-black text-emerald-300">Hybrid Memory</p>
                    </div>
                </div>

                <div className="mt-8 grid gap-5">
                    {loading ? (
                        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8 text-center text-white/45">
                            Loading token memory...
                        </div>
                    ) : logs.length === 0 ? (
                        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8 text-center text-white/45">
                            No matching memory found.
                        </div>
                    ) : (
                        logs.map((log) => (
                            <article key={log.id} className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
                                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap gap-3">
                                            <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-black text-emerald-200">
                                                {log.chain || "solana"}
                                            </span>

                                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-black text-white/60">
                                                {log.check_count || 0} checks
                                            </span>

                                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-black text-white/60">
                                                {log.latest_risk || "unknown risk"}
                                            </span>

                                            <span className={`rounded-full px-3 py-1 text-xs font-black ${labelStyle(log.operator_label || "watch")}`}>
                                                {log.operator_label || "watch"}
                                            </span>
                                        </div>

                                        <h3 className="mt-4 text-3xl font-black">
                                            {log.token_name || "Unknown Token"} ({log.token_symbol || "?"})
                                        </h3>

                                        <p className="mt-2 break-all font-mono text-xs text-white/40">
                                            {log.contract}
                                        </p>

                                        <div className="mt-5 grid gap-3 text-sm md:grid-cols-4">
                                            <p>Score: <span className="font-black">{log.latest_score ?? "—"}</span></p>
                                            <p>MC: <span className="font-black">{formatNumber(log.market_cap)}</span></p>
                                            <p>Liquidity: <span className="font-black">{formatNumber(log.liquidity)}</span></p>
                                            <p>Volume: <span className="font-black">{formatNumber(log.volume_24h)}</span></p>
                                        </div>

                                        {log.operator_note && (
                                            <div className="mt-5 rounded-2xl border border-cyan-300/15 bg-cyan-300/5 p-4">
                                                <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">
                                                    Operator Note
                                                </p>
                                                <p className="mt-2 text-sm leading-7 text-white/70">
                                                    {log.operator_note}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        <Link href={`/token/${log.contract}`} className="rounded-2xl border border-emerald-300/25 bg-emerald-300/10 px-4 py-3 text-sm font-black text-emerald-200">
                                            <span className="inline-flex items-center gap-2">
                                                <ExternalLink className="h-4 w-4" />
                                                Open Dossier
                                            </span>
                                        </Link>

                                        <button
                                            onClick={() => copyContract(log.id, log.contract)}
                                            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white/75"
                                        >
                                            <span className="inline-flex items-center gap-2">
                                                <Copy className="h-4 w-4" />
                                                {copiedId === log.id ? "Copied" : "Copy CA"}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))
                    )}
                </div>
            </section>
        </main>
    );
}