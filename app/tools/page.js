import Link from "next/link";
import {
  SearchCheck,
  ShieldAlert,
  Database,
  Wallet,
  ArrowRight,
  Eye,
  Radar,
  Cpu,
} from "lucide-react";

const tools = [
  {
    title: "Contract Metadata",
    desc: "Quick inspect token source presence, socials, website quality, pair age, and metadata health.",
    href: "/tools/contract-metadata",
    icon: SearchCheck,
  },
  {
    title: "Rug Risk Layer",
    desc: "Run lightweight rug and instability checks across liquidity, holder structure, and source confidence.",
    href: "/tools/rug-risk",
    icon: ShieldAlert,
  },
  {
    title: "Token Memory",
    desc: "Search archived contracts already processed by Trust The Signal memory continuation routes.",
    href: "/tools/token-memory",
    icon: Database,
  },
  {
    title: "Wallet Snapshot",
    desc: "Inspect top wallet structure, participation behavior, and surface-level concentration overview.",
    href: "/tools/wallet-snapshot",
    icon: Wallet,
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
                TOOL COMMAND
              </h1>
            </div>
          </div>

          <div className="hidden gap-3 sm:flex">
            <Link href="/" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
              Home
            </Link>
            <Link href="/trending" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
              Trending
            </Link>
            <Link href="/products" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
              Products
            </Link>
          </div>
        </header>

        <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-black to-emerald-900/20 p-6 shadow-[0_0_80px_rgba(16,185,129,0.12)] sm:p-8">
          <div className="mb-4 flex items-center gap-2 text-emerald-300">
            <Radar className="h-5 w-5" />
            <p className="text-sm uppercase tracking-[0.28em]">
              Utility Intelligence Layer
            </p>
          </div>

          <h2 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            Dedicated operator support tools.
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-8 text-white/65">
            These command routes extend beyond homepage checks and provide
            isolated utility scans for metadata, rug structure, archived token
            memory, and wallet participation review.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
            <Cpu className="h-5 w-5 text-emerald-300" />
            <p className="mt-4 text-lg font-black">Standalone Utility Routes</p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
            <Database className="h-5 w-5 text-emerald-300" />
            <p className="mt-4 text-lg font-black">Memory Connected Tools</p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
            <Radar className="h-5 w-5 text-emerald-300" />
            <p className="mt-4 text-lg font-black">Operator Scan Extensions</p>
          </div>
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
                <Icon className="h-6 w-6 text-emerald-300" />

                <h3 className="mt-5 text-2xl font-black">{tool.title}</h3>

                <p className="mt-3 text-sm leading-7 text-white/60">
                  {tool.desc}
                </p>

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
