"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    Wallet,
    ArrowLeft,
    Radar,
    Activity,
    Eye,
    Search,
    CheckCircle2,
    AlertTriangle,
} from "lucide-react";

const walletSignals = [
    "Repeat appearances across early token checks",
    "Candidate smart-wallet behavior",
    "Future cluster detection and wallet grouping",
    "Momentum entries versus exit-heavy wallets",
    "Wallet recurrence across high-quality setups",
    "Protected operator wallet watchlists",
];

const futureModules = [
    "Wallet recurrence score",
    "Early buyer classification",
    "Smart cluster labeling",
    "Suspicious exit tracking",
    "Token overlap detection",
    "Protected wallet notes",
];

const SOLANA_ADDRESS_REGEX = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export default function WalletSnapshotToolPage() {
    const [wallet, setWallet] = useState("");
    const [submittedWallet, setSubmittedWallet] = useState("");

    const walletStatus = useMemo(() => {
        if (!submittedWallet) return null;

        const clean = submittedWallet.trim();

        if (!SOLANA_ADDRESS_REGEX.test(clean)) {
            return {
                valid: false,
                title: "Invalid Wallet Format",
                description:
                    "This does not look like a valid Solana wallet address. Check length, characters, and spacing.",
            };
        }

        return {
            valid: true,
            title: "Wallet Format Confirmed",
            description:
                "This wallet passes base Solana address format checks. Deeper behavior scoring can be connected in the next intelligence phase.",
        };
    }, [submittedWallet]);

    function runSnapshot() {
        setSubmittedWallet(wallet.trim());
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
                            WALLET SNAPSHOT
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
                        <Wallet className="h-5 w-5" />
                        <p className="text-sm uppercase tracking-[0.28em]">
                            Wallet Intelligence Preview
                        </p>
                    </div>

                    <h2 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
                        Validate wallet format and prepare behavior review.
                    </h2>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-white/65">
                        This tool now performs wallet format validation and prepares the
                        surface for future smart wallet behavior, recurrence, cluster, and
                        protected watchlist intelligence.
                    </p>

                    <div className="mt-7 flex flex-col gap-4 md:flex-row">
                        <input
                            value={wallet}
                            onChange={(e) => setWallet(e.target.value)}
                            placeholder="Paste Solana wallet address..."
                            className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm outline-none placeholder:text-white/30 focus:border-emerald-300/40"
                        />

                        <button
                            onClick={runSnapshot}
                            className="rounded-2xl bg-emerald-400 px-6 py-4 text-sm font-black text-black hover:bg-emerald-300"
                        >
                            <span className="inline-flex items-center gap-2">
                                <Search className="h-4 w-4" />
                                Run Snapshot
                            </span>
                        </button>
                    </div>
                </div>

                {walletStatus && (
                    <div
                        className={`mt-8 rounded-[1.75rem] border p-6 ${walletStatus.valid
                            ? "border-emerald-300/25 bg-emerald-300/10"
                            : "border-red-300/25 bg-red-300/10"
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            {walletStatus.valid ? (
                                <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-300" />
                            ) : (
                                <AlertTriangle className="mt-1 h-5 w-5 text-red-300" />
                            )}

                            <div>
                                <h3 className="text-2xl font-black">{walletStatus.title}</h3>
                                <p className="mt-2 text-sm leading-7 text-white/65">
                                    {walletStatus.description}
                                </p>

                                <p className="mt-4 break-all font-mono text-xs text-white/45">
                                    {submittedWallet}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.85fr]">
                    <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
                        <div className="mb-4 flex items-center gap-2 text-emerald-300">
                            <Radar className="h-5 w-5" />
                            <p className="text-sm uppercase tracking-[0.24em]">
                                Wallet Signals To Track
                            </p>
                        </div>

                        <div className="grid gap-3">
                            {walletSignals.map((signal) => (
                                <div
                                    key={signal}
                                    className="rounded-2xl border border-white/10 bg-black/35 p-4 text-sm leading-7 text-white/70"
                                >
                                    {signal}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
                        <div className="mb-4 flex items-center gap-2 text-emerald-300">
                            <Activity className="h-5 w-5" />
                            <p className="text-sm uppercase tracking-[0.24em]">
                                Future Modules
                            </p>
                        </div>

                        <div className="grid gap-3">
                            {futureModules.map((module) => (
                                <div
                                    key={module}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-bold text-white/70"
                                >
                                    {module}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 rounded-[1.75rem] border border-emerald-300/20 bg-emerald-300/10 p-6">
                    <div className="flex items-start gap-3">
                        <Eye className="mt-1 h-5 w-5 text-emerald-300" />
                        <div>
                            <h3 className="text-xl font-black">
                                Wallet behavior becomes edge when it repeats.
                            </h3>
                            <p className="mt-2 text-sm leading-7 text-white/65">
                                Next phases can connect holder APIs, scanner-discovered wallets,
                                token overlap memory, wallet labels, and smart-cluster pattern
                                scoring.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}