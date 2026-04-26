import Link from "next/link";
import {
    Radar,
    ShieldAlert,
    Wallet,
    FileSearch,
    ArrowRight,
    Eye,
    Lock,
} from "lucide-react";

const tools = [
    {
        title: "Signal Check Pro",
        description:
            "Run live Solana contract intelligence through the weighted Trust The Signal scoring engine.",
        href: "/",
        icon: Radar,
        status: "Live",
    },
    {
        title: "Rug Risk Checker",
        description:
            "Structured rug-risk review shell for liquidity, source presence, flags, and dangerous setup behavior.",
        href: "/tools/rug-risk",
        icon: ShieldAlert,
        status: "Foundation",
    },
    {
        title: "Wallet Snapshot",
        description:
            "Prepared wallet review layer for future smart wallet, recurrence, and behavioral intelligence.",
        href: "/tools/wallet-snapshot",
        icon: Wallet,
        status: "Foundation",
    },
    {
        title: "Contract Metadata",
        description:
            "Fast contract profile shell for token identity, links, routing, and source confidence review.",
        href: "/tools/contract-metadata",
        icon: FileSearch,
        status: "Foundation",
    },
];

export default function ToolsPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,170,0.16),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.07),transparent_18%)]" />

            <section className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8">
                <header className="mb-10 flex items-center justify-between rounded-3xl border border-white/10 bg-black/50 px-5 py-4 backdrop-blur-2xl">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10">
                            <Eye className="h-5 w-5 text-emerald-300" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                                TRUST THE SIGNAL
                            </p>
                            <h1 className="text-lg font-semibold tracking-[0.2em]">
                                TOOL SUITE
                            </h1>
                        </div>
                    </div>

                    <div className="hidden gap-3 sm:flex">
                        <Link
                            href="/"
                            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 hover:border-emerald-300/30"
                        >
                            Home
                        </Link>
                        <Link
                            href="/protected"
                            className="rounded-2xl border border-emerald-300/30 bg-emerald-300/10 px-4 py-3 text-sm font-bold text-emerald-100 hover:bg-emerald-300/20"
                        >
                            Protected
                        </Link>
                    </div>
                </header>

                <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-black to-emerald-900/20 p-6 shadow-[0_0_80px_rgba(16,185,129,0.12)] sm:p-8">
                    <div className="mb-4 flex items-center gap-2 text-emerald-300">
                        <Lock className="h-5 w-5" />
                        <p className="text-sm uppercase tracking-[0.28em]">
                            Public Intelligence Utility Layer
                        </p>
                    </div>

                    <h2 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
                        A growing suite of signal-first crypto tools.
                    </h2>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-white/65">
                        Trust The Signal is being structured as a premium intelligence
                        ecosystem: contract checks, rug-risk review, wallet behavior,
                        metadata routing, token dossiers, and future protected operator
                        access.
                    </p>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                    {tools.map((tool) => {
                        const Icon = tool.icon;

                        return (
                            <Link
                                key={tool.title}
                                href={tool.href}
                                className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-emerald-300/30 hover:bg-emerald-300/[0.08]"
                            >
                                <div className="flex items-start justify-between gap-5">
                                    <div>
                                        <Icon className="h-6 w-6 text-emerald-300" />
                                        <h3 className="mt-5 text-2xl font-black">{tool.title}</h3>
                                        <p className="mt-3 max-w-xl text-sm leading-7 text-white/60">
                                            {tool.description}
                                        </p>
                                    </div>

                                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white/45">
                                        {tool.status}
                                    </span>
                                </div>

                                <div className="mt-6 inline-flex items-center gap-2 text-sm font-black text-emerald-200">
                                    Open Tool <ArrowRight className="h-4 w-4" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}