import Link from "next/link";
import {
    Wallet,
    ArrowLeft,
    Radar,
    Lock,
    Activity,
    Eye,
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

export default function WalletSnapshotToolPage() {
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
                        <Wallet className="h-5 w-5" />
                        <p className="text-sm uppercase tracking-[0.28em]">
                            Wallet Intelligence Foundation
                        </p>
                    </div>

                    <h2 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
                        Wallet behavior becomes signal when it repeats.
                    </h2>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-white/65">
                        This page prepares the wallet intelligence layer for Trust The Signal.
                        Future versions can classify smart wallets, detect recurrence, and
                        surface patterns from token checks, scanner findings, and protected
                        operator watchlists.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                        <Link
                            href="/protected"
                            className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-black hover:bg-emerald-300"
                        >
                            Request Protected Access
                        </Link>

                        <Link
                            href="/admin/token-logs"
                            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white/70 hover:border-emerald-300/30"
                        >
                            View Operator Logs
                        </Link>
                    </div>
                </div>

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
                                This becomes the bridge between scanner memory and operator edge.
                            </h3>
                            <p className="mt-2 text-sm leading-7 text-white/65">
                                Once connected to wallet APIs and your scanner data, this tool can
                                show whether wallets are early, recurring, dangerous, profitable,
                                or noise-producing.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}