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
    ShieldCheck,
    Lock,
} from "lucide-react";

const SOLANA_ADDRESS_REGEX = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

const walletSignals = [
    "Format validity",
    "Address length profile",
    "Manual operator classification",
    "Future recurrence scoring",
    "Future token overlap detection",
    "Future protected wallet watchlists",
];

const futureModules = [
    "Wallet holdings lookup",
    "Recent transaction activity",
    "Early buyer detection",
    "Smart wallet recurrence score",
    "Suspicious exit behavior",
    "Scanner-discovered wallet labels",
];

function scoreWallet(wallet) {
    const clean = wallet.trim();

    if (!clean) {
        return {
            valid: false,
            score: 0,
            label: "No Wallet Entered",
            verdict: "Paste a Solana wallet address to run snapshot validation.",
            flags: ["missing_wallet"],
        };
    }

    const flags = [];
    let score = 50;

    if (!SOLANA_ADDRESS_REGEX.test(clean)) {
        return {
            valid: false,
            score: 10,
            label: "Invalid Format",
            verdict:
                "This does not match the expected Solana wallet address format.",
            flags: ["invalid_format"],
        };
    }

    score += 25;

    if (clean.length >= 40 && clean.length <= 44) {
        score += 15;
    } else {
        score += 5;
        flags.push("unusual_length_profile");
    }

    if (clean.includes("111111")) {
        score -= 8;
        flags.push("repeated_character_pattern");
    }

    const finalScore = Math.max(0, Math.min(100, score));

    let label = "Format Confirmed";
    let verdict =
        "Wallet passes base validation and is ready for deeper behavior intelligence later.";

    if (finalScore >= 85) {
        label = "Clean Format";
        verdict =
            "Wallet structure looks clean by base validation. Deeper activity review can be connected next.";
    } else if (finalScore >= 60) {
        label = "Review Ready";
        verdict =
            "Wallet format is valid, but a deeper future activity check would improve confidence.";
    }

    return {
        valid: true,
        score: finalScore,
        label,
        verdict,
        flags,
    };
}

export default function WalletSnapshotToolPage() {
    const [wallet, setWallet] = useState("");
    const [submittedWallet, setSubmittedWallet] = useState("");
    const [operatorLabel, setOperatorLabel] = useState("watch");
    const [operatorNote, setOperatorNote] = useState("");

    const walletStatus = useMemo(() => {
        if (!submittedWallet) return null;
        return scoreWallet(submittedWallet);
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
                            WALLET SNAPSHOT V2
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
                        Validate wallet structure and prepare operator notes.
                    </h2>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-white/65">
                        Wallet Snapshot V2 checks base Solana wallet structure, produces a
                        lightweight validation score, and gives you a manual operator
                        classification workspace before deeper wallet APIs are connected.
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
                    <div className="mt-8 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                        <div
                            className={`rounded-[1.75rem] border p-6 ${walletStatus.valid
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
                                    <p className="text-xs font-black uppercase tracking-[0.25em] text-white/45">
                                        Snapshot Result
                                    </p>

                                    <h3 className="mt-3 text-3xl font-black">
                                        {walletStatus.label}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-white/65">
                                        {walletStatus.verdict}
                                    </p>

                                    <div className="mt-5 rounded-2xl border border-white/10 bg-black/35 p-4">
                                        <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                                            Wallet Score
                                        </p>
                                        <p className="mt-2 text-5xl font-black text-emerald-300">
                                            {walletStatus.score}
                                        </p>
                                    </div>

                                    <p className="mt-4 break-all font-mono text-xs text-white/45">
                                        {submittedWallet}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
                            <div className="mb-4 flex items-center gap-2 text-emerald-300">
                                <ShieldCheck className="h-5 w-5" />
                                <p className="text-sm uppercase tracking-[0.24em]">
                                    Manual Operator Classification
                                </p>
                            </div>

                            <div className="grid gap-4">
                                <select
                                    value={operatorLabel}
                                    onChange={(e) => setOperatorLabel(e.target.value)}
                                    className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-sm font-bold outline-none"
                                >
                                    <option value="watch">watch</option>
                                    <option value="high_interest">high_interest</option>
                                    <option value="revisit">revisit</option>
                                    <option value="dead">dead</option>
                                    <option value="premium_candidate">premium_candidate</option>
                                </select>

                                <textarea
                                    value={operatorNote}
                                    onChange={(e) => setOperatorNote(e.target.value)}
                                    placeholder="Manual wallet note / reason to revisit / pattern observed..."
                                    className="min-h-[130px] rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-sm outline-none placeholder:text-white/30"
                                />

                                <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/5 p-4">
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">
                                        Local Operator Note
                                    </p>
                                    <p className="mt-2 text-sm leading-7 text-white/65">
                                        Label: <span className="font-black">{operatorLabel}</span>
                                    </p>
                                    <p className="mt-1 text-sm leading-7 text-white/65">
                                        {operatorNote || "No note added yet."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {walletStatus.flags.length > 0 && (
                            <div className="lg:col-span-2 rounded-[1.75rem] border border-yellow-300/20 bg-yellow-300/10 p-6">
                                <div className="mb-4 flex items-center gap-2 text-yellow-200">
                                    <AlertTriangle className="h-5 w-5" />
                                    <p className="text-sm uppercase tracking-[0.24em]">
                                        Snapshot Flags
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {walletStatus.flags.map((flag) => (
                                        <span
                                            key={flag}
                                            className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white/75"
                                        >
                                            {flag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
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
                        <Lock className="mt-1 h-5 w-5 text-emerald-300" />
                        <div>
                            <h3 className="text-xl font-black">
                                Next wallet phase connects live wallet APIs.
                            </h3>
                            <p className="mt-2 text-sm leading-7 text-white/65">
                                The next upgrade can connect holdings, recent transactions,
                                token overlap, PnL-style behavior, and scanner-discovered smart
                                wallet labels.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}