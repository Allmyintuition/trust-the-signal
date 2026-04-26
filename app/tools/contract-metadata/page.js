import Link from "next/link";
import {
    FileSearch,
    ArrowLeft,
    ExternalLink,
    Radar,
    Lock,
    Database,
} from "lucide-react";

const metadataLayers = [
    "Token name and symbol consistency",
    "DEX source and pair routing",
    "Website and social presence",
    "Source health classification",
    "Image / metadata availability",
    "Dedicated token dossier continuation",
];

const nextUpgrades = [
    "direct metadata lookup input",
    "source confidence score",
    "social link extraction",
    "token identity warning flags",
    "deployer / pair history",
    "metadata change tracking",
];

export default function ContractMetadataToolPage() {
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
                            CONTRACT METADATA
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
                        <FileSearch className="h-5 w-5" />
                        <p className="text-sm uppercase tracking-[0.28em]">
                            Contract Identity Layer
                        </p>
                    </div>

                    <h2 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
                        Metadata tells you what the market wants you to believe.
                    </h2>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-white/65">
                        This tool prepares a dedicated metadata review layer for token
                        identity, source confidence, social presence, and continuation into
                        premium token dossiers.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                        <Link
                            href="/"
                            className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-black hover:bg-emerald-300"
                        >
                            Run Signal Check
                        </Link>

                        <Link
                            href="/trending"
                            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white/70 hover:border-emerald-300/30"
                        >
                            Open Trending
                        </Link>
                    </div>
                </div>

                <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.85fr]">
                    <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
                        <div className="mb-4 flex items-center gap-2 text-emerald-300">
                            <Radar className="h-5 w-5" />
                            <p className="text-sm uppercase tracking-[0.24em]">
                                Metadata Layers
                            </p>
                        </div>

                        <div className="grid gap-3">
                            {metadataLayers.map((layer) => (
                                <div
                                    key={layer}
                                    className="rounded-2xl border border-white/10 bg-black/35 p-4 text-sm leading-7 text-white/70"
                                >
                                    {layer}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
                        <div className="mb-4 flex items-center gap-2 text-emerald-300">
                            <Database className="h-5 w-5" />
                            <p className="text-sm uppercase tracking-[0.24em]">
                                Next Upgrades
                            </p>
                        </div>

                        <div className="grid gap-3">
                            {nextUpgrades.map((upgrade) => (
                                <div
                                    key={upgrade}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-bold text-white/70"
                                >
                                    {upgrade}
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
                                Metadata review will become part of the protected intelligence path.
                            </h3>
                            <p className="mt-2 text-sm leading-7 text-white/65">
                                Future versions can use this route to detect weak token identity,
                                missing sources, suspicious link changes, or low-confidence launch
                                profiles before deeper trading action.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}