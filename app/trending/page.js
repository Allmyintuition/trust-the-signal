"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
    Eye,
    Radar,
    Activity,
    Droplets,
    TrendingUp,
    ExternalLink,
    Loader2,
    AlertTriangle,
    ArrowLeft,
    Copy,
    Check,
    ShieldCheck,
    FileSearch,
    Search,
} from "lucide-react";

const formatNum = (num) => {
    if (!num && num !== 0) return "--";
    return Number(num).toLocaleString();
};

const Card = ({ children, className = "" }) => (
    <div
        className={`rounded-[28px] border border-white/10 bg-white/[0.055] shadow-2xl shadow-emerald-500/10 backdrop-blur-xl ${className}`}
    >
        {children}
    </div>
);

const TokenCard = ({ token }) => {
    const [copied, setCopied] = useState(false);
    const encodedAddress = token.address ? encodeURIComponent(token.address) : "";

    const copyContract = async () => {
        if (!token.address) return;

        try {
            await navigator.clipboard.writeText(token.address);
            setCopied(true);
            setTimeout(() => setCopied(false), 1400);
        } catch {
            const textArea = document.createElement("textarea");
            textArea.value = token.address;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 1400);
        }
    };

    return (
        <Card className="transition hover:-translate-y-1 hover:border-emerald-300/30">
            <div className="p-5">
                <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                            {token.dex}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold text-white">
                            {token.name}
                        </h3>
                        <p className="text-sm text-emerald-300">{token.symbol}</p>
                    </div>

                    {token.pairUrl && (
                        <a
                            href={token.pairUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-2 text-emerald-200 hover:bg-emerald-400/20"
                            title="Open DexScreener"
                        >
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    )}
                </div>

                <div className="grid gap-3">
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                            Liquidity
                        </p>
                        <p className="mt-1 text-lg font-medium text-emerald-200">
                            ${formatNum(token.liquidity)}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                            24H Volume
                        </p>
                        <p className="mt-1 text-lg font-medium text-emerald-200">
                            ${formatNum(token.volume24h)}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                            24H Change
                        </p>
                        <p className="mt-1 text-lg font-medium text-emerald-200">
                            {Number(token.priceChange24h || 0).toFixed(2)}%
                        </p>
                    </div>
                </div>

                {token.address && (
                    <div className="mt-4 grid gap-3">
                        <a
                            href={`/token/${encodedAddress}`}
                            className="rounded-2xl bg-emerald-400 px-4 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
                        >
                            <span className="inline-flex items-center justify-center gap-2">
                                <FileSearch className="h-4 w-4" />
                                Analyze Token
                            </span>
                        </a>

                        <div className="grid gap-3 md:grid-cols-2">
                            <a
                                href={`/?contract=${encodedAddress}`}
                                className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-center text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/20"
                            >
                                <span className="inline-flex items-center justify-center gap-2">
                                    <ShieldCheck className="h-4 w-4" />
                                    Quick Check
                                </span>
                            </a>

                            <button
                                onClick={copyContract}
                                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white/75 transition hover:border-emerald-300/30 hover:text-white"
                            >
                                <span className="inline-flex items-center justify-center gap-2">
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    {copied ? "Copied" : "Copy CA"}
                                </span>
                            </button>
                        </div>
                    </div>
                )}

                {token.address && (
                    <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                            Contract
                        </p>
                        <p className="mt-1 break-all font-mono text-xs text-white/55">
                            {token.address}
                        </p>
                    </div>
                )}
            </div>
        </Card>
    );
};

const Section = ({ title, subtitle, icon: Icon, tokens }) => (
    <section className="pt-14">
        <div className="mb-6 flex items-end justify-between gap-4">
            <div>
                <div className="mb-3 flex items-center gap-2 text-emerald-300">
                    <Icon className="h-5 w-5" />
                    <p className="text-sm uppercase tracking-[0.24em]">{subtitle}</p>
                </div>
                <h2 className="text-3xl font-semibold md:text-5xl">{title}</h2>
            </div>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/45">
                {tokens.length} visible
            </span>
        </div>

        {tokens.length === 0 ? (
            <Card>
                <div className="p-8 text-center text-white/45">
                    No matching tokens in this section.
                </div>
            </Card>
        ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {tokens.map((token, index) => (
                    <TokenCard key={`${token.address}-${index}`} token={token} />
                ))}
            </div>
        )}
    </section>
);

export default function TrendingPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [minLiquidity, setMinLiquidity] = useState("0");

    useEffect(() => {
        const loadTrending = async () => {
            try {
                const response = await fetch("/api/trending", {
                    method: "GET",
                    cache: "no-store",
                });

                const json = await response.json();

                if (!json.success) {
                    setError(json.error || "Unable to load trending tokens.");
                } else {
                    setData(json.result);
                }
            } catch (err) {
                setError("Trending intelligence route failed.");
            }

            setLoading(false);
        };

        loadTrending();
    }, []);

    const filterTokens = (tokens = []) => {
        const q = search.trim().toLowerCase();
        const min = Number(minLiquidity || 0);

        return tokens.filter((token) => {
            const text = `${token.name} ${token.symbol} ${token.address} ${token.dex}`.toLowerCase();
            const matchesSearch = q ? text.includes(q) : true;
            const matchesLiquidity = Number(token.liquidity || 0) >= min;

            return matchesSearch && matchesLiquidity;
        });
    };

    const filtered = useMemo(() => {
        if (!data) {
            return {
                topLiquidity: [],
                topVolume: [],
                topMomentum: [],
            };
        }

        return {
            topLiquidity: filterTokens(data.topLiquidity || []),
            topVolume: filterTokens(data.topVolume || []),
            topMomentum: filterTokens(data.topMomentum || []),
        };
    }, [data, search, minLiquidity]);

    const totalVisible =
        filtered.topLiquidity.length +
        filtered.topVolume.length +
        filtered.topMomentum.length;

    return (
        <main className="min-h-screen overflow-hidden bg-black text-white">
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,170,0.18),transparent_34%),radial-gradient(circle_at_78%_16%,rgba(255,255,255,0.08),transparent_17%),radial-gradient(circle_at_12%_78%,rgba(0,180,140,0.14),transparent_25%)]" />
            <div className="fixed inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:48px_48px]" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-5 md:py-8">
                <header className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between rounded-3xl border border-white/10 bg-black/50 px-4 sm:px-5 py-3 md:py-4 shadow-2xl shadow-emerald-500/10 backdrop-blur-2xl">
                    <div className="flex items-center gap-3">
                        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10">
                            <Eye className="relative h-5 w-5 text-emerald-300" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                                TRUST THE SIGNAL
                            </p>
                            <h1 className="text-lg font-semibold tracking-[0.2em]">
                                TRENDING INTELLIGENCE
                            </h1>
                        </div>
                    </div>

                    <div className="grid w-full grid-cols-2 gap-2 md:flex md:w-auto md:gap-3">
                        <a
                            href="/tools"
                            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 hover:border-emerald-300/30 hover:text-white"
                        >
                            Tools
                        </a>

                        <a
                            href="/products"
                            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 hover:border-emerald-300/30 hover:text-white"
                        >
                            Products
                        </a>

                        <a
                            href="/"
                            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 hover:border-emerald-300/30 hover:text-white"
                        >
                            <span className="inline-flex items-center gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Home
                            </span>
                        </a>
                    </div>
                </header>

                <motion.section
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="pt-8 md:pt-12 lg:pt-16"
                >
                    <div className="mb-4 flex flex-wrap gap-2">
                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/75">
                            📡 Live DexScreener Feed
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/75">
                            👁️ Solana Discovery
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/75">
                            🧠 Token Pages Connected
                        </span>
                    </div>

                    <h2 className="max-w-4xl text-4xl font-semibold leading-[0.98] tracking-tight md:text-7xl">
                        Live token discovery.
                        <span className="block bg-gradient-to-r from-emerald-200 via-emerald-400 to-white bg-clip-text text-transparent">
                            Filter what is moving now.
                        </span>
                    </h2>

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
                        Discover Solana tokens by liquidity, volume, and momentum, then route
                        directly into dossiers, Signal Check, memory, and operator tools.
                    </p>
                </motion.section>

                <section className="pt-7 md:pt-10">
                    <Card className="border-emerald-400/20 bg-emerald-400/10">
                        <div className="grid gap-3 p-4 md:p-5 lg:grid-cols-[1fr_240px_140px]">
                            <div className="relative">
                                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search token, symbol, contract, dex..."
                                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-11 py-4 text-sm outline-none placeholder:text-white/30"
                                />
                            </div>

                            <select
                                value={minLiquidity}
                                onChange={(e) => setMinLiquidity(e.target.value)}
                                className="appearance-none rounded-2xl border border-white/10 bg-black/40 px-4 py-4 pr-10 text-sm font-bold outline-none"
                            >
                                <option value="0">Min Liquidity: Any</option>
                                <option value="5000">$5K+</option>
                                <option value="10000">$10K+</option>
                                <option value="25000">$25K+</option>
                                <option value="50000">$50K+</option>
                                <option value="100000">$100K+</option>
                            </select>

                            <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-center text-sm font-black text-emerald-200">
                                {totalVisible} visible
                            </div>
                        </div>
                    </Card>
                </section>

                <section className="pt-7 md:pt-10">
                    <Card className="border-emerald-400/20 bg-emerald-400/10">
                        <div className="grid gap-4 p-5 md:grid-cols-3">
                            {[
                                ["Analyze Token", "Open a dedicated token intelligence page."],
                                ["Quick Check", "Send the contract directly to the homepage checker."],
                                ["Token Memory", "Search prior checked contracts from the platform archive."],
                            ].map(([title, desc]) => (
                                <div key={title} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                                    <p className="font-semibold text-emerald-200">{title}</p>
                                    <p className="mt-2 text-sm leading-6 text-white/60">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </section>

                {loading && (
                    <div className="flex min-h-[320px] items-center justify-center">
                        <div className="flex items-center gap-3 text-emerald-300">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>Loading live token intelligence...</span>
                        </div>
                    </div>
                )}

                {!loading && error && (
                    <Card className="mt-14 border-red-400/20 bg-red-400/10">
                        <div className="flex items-center gap-3 p-6 text-red-100">
                            <AlertTriangle className="h-5 w-5" />
                            <p>{error}</p>
                        </div>
                    </Card>
                )}

                {!loading && data && (
                    <>
                        <Section
                            title="Top Liquidity"
                            subtitle="Structure Strength"
                            icon={Droplets}
                            tokens={filtered.topLiquidity}
                        />

                        <Section
                            title="Top Volume"
                            subtitle="Market Activity"
                            icon={Activity}
                            tokens={filtered.topVolume}
                        />

                        <Section
                            title="Top Momentum"
                            subtitle="Price Movement"
                            icon={TrendingUp}
                            tokens={filtered.topMomentum}
                        />

                        <section className="pb-12 pt-20">
                            <Card className="border-emerald-400/20 bg-emerald-400/10">
                                <div className="p-8">
                                    <div className="mb-3 flex items-center gap-2 text-emerald-300">
                                        <Radar className="h-5 w-5" />
                                        <p className="text-sm uppercase tracking-[0.24em]">
                                            Ecosystem Loop Active
                                        </p>
                                    </div>
                                    <h2 className="text-3xl font-semibold">
                                        Discovery routes into dossiers, memory, and Signal Check Pro.
                                    </h2>
                                    <p className="mt-4 max-w-3xl leading-8 text-white/65">
                                        Use Analyze Token for a dedicated intelligence URL, Quick Check
                                        for the homepage engine, or Token Memory to revisit archived
                                        checks and repeated demand.
                                    </p>

                                    <a
                                        href="/tools/token-memory"
                                        className="mt-6 inline-flex rounded-2xl border border-emerald-300/25 bg-emerald-300/10 px-5 py-3 text-sm font-black text-emerald-200 hover:bg-emerald-300/20"
                                    >
                                        Open Token Memory
                                    </a>
                                </div>
                            </Card>
                        </section>
                    </>
                )}
            </div>
        </main>
    );
}