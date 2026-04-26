import Link from "next/link";
import {
    ShieldAlert,
    ArrowLeft,
    CheckCircle2,
    AlertTriangle,
    Lock,
    Radar,
} from "lucide-react";

const checks = [
    "Liquidity strength and liquidity-to-market-cap balance",
    "Source presence, website/social count, and metadata confidence",
    "Buy/sell pressure and transaction imbalance",
    "Volume-to-liquidity spike behavior",
    "Extremely new pair caution logic",
    "Thin-liquidity pump warning layer",
];

const states = [
    {
        title: "Safe",
        description:
            "Structure appears controlled, liquidity is stronger, and major risk flags are limited.",
        icon: CheckCircle2,
    },
    {
        title: "Caution",
        description:
            "Signal is developing, but confirmation is still needed before serious commitment.",
        icon: AlertTriangle,
    },
    {
        title: "Danger",
        description:
            "Weak structure, poor liquidity, heavy negative behavior, or dangerous source profile.",
        icon: ShieldAlert,
    },
];

export default function RugRiskToolPage() {
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

                    <Link
                        href="/tools"
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 hover:border-emerald-300/30"
                    >
                        <span className="inline-flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Tools
                        </span>
                    </Link>
                </header>

                <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-black to-emerald-900/20 p-6 shadow-[0_0_80px_rgba(16,185,129,0.12)] sm:p-8">
                    <div className="mb-4 flex items-center gap-2 text-emerald-300">
                        <ShieldAlert className="h-5 w-5" />
                        <p className="text-sm uppercase tracking-[0.28em]">
                            Rug Filter Foundation
                        </p>
                    </div>

                    <h2 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
                        Risk is not noise. It is signal structure.
                    </h2>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-white/65">
                        This tool shell prepares the standalone rug-risk layer for Trust The
                        Signal. The current live Signal Check already includes risk flags;
                        this page becomes the dedicated future destination for deeper rug
                        analysis.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                        <Link
                            href="/"
                            className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-black hover:bg-emerald-300"
                        >
                            Run Signal Check
                        </Link>

                        <Link
                            href="/protected"
                            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white/70 hover:border-emerald-300/30"
                        >
                            Request Protected Access
                        </Link>
                    </div>
                </div>

                <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.85fr]">
                    <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
                        <div className="mb-4 flex items-center gap-2 text-emerald-300">
                            <Radar className="h-5 w-5" />
                            <p className="text-sm uppercase tracking-[0.24em]">
                                Risk Checks Prepared
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

                    <div className="grid gap-4">
                        {states.map((state) => {
                            const Icon = state.icon;

                            return (
                                <div
                                    key={state.title}
                                    className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5"
                                >
                                    <Icon className="h-5 w-5 text-emerald-300" />
                                    <h3 className="mt-4 text-2xl font-black">{state.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-white/60">
                                        {state.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8 rounded-[1.75rem] border border-emerald-300/20 bg-emerald-300/10 p-6">
                    <div className="flex items-start gap-3">
                        <Lock className="mt-1 h-5 w-5 text-emerald-300" />
                        <div>
                            <h3 className="text-xl font-black">
                                Standalone deep rug scanner coming next.
                            </h3>
                            <p className="mt-2 text-sm leading-7 text-white/65">
                                The foundation is in place. Future upgrades can connect deeper
                                holder concentration, deployer history, LP lock review, mint
                                authority, freeze authority, and wallet clustering.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}