import Link from "next/link";
import {
    BookOpen,
    ArrowLeft,
    CheckCircle2,
    Lock,
    Sparkles,
} from "lucide-react";

const included = [
    "How to read liquidity, volume, and market-cap structure",
    "How to identify safe vs caution vs dangerous setups",
    "Understanding fake momentum and thin-liquidity traps",
    "How to structure entries and avoid emotional chasing",
    "When to scale, when to trim, when to fully avoid",
    "Operator survival rules and execution discipline",
];

export default function SignalOperatorGuidePage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,170,0.16),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.07),transparent_18%)]" />

            <section className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8">
                <header className="mb-10 flex items-center justify-between rounded-3xl border border-white/10 bg-black/50 px-5 py-4 backdrop-blur-2xl">
                    <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                            TRUST THE SIGNAL
                        </p>
                        <h1 className="text-lg font-semibold tracking-[0.2em]">
                            SIGNAL OPERATOR GUIDE
                        </h1>
                    </div>

                    <Link
                        href="/products"
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 hover:border-emerald-300/30"
                    >
                        <span className="inline-flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Products
                        </span>
                    </Link>
                </header>

                <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-black to-emerald-900/20 p-6 shadow-[0_0_80px_rgba(16,185,129,0.12)] sm:p-8">
                    <div className="mb-4 flex items-center gap-2 text-emerald-300">
                        <BookOpen className="h-5 w-5" />
                        <p className="text-sm uppercase tracking-[0.28em]">
                            Premium Guide Preview
                        </p>
                    </div>

                    <h2 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
                        The foundation guide for structured token decision making.
                    </h2>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-white/65">
                        Built for users who want more than random calls and blind entries.
                        This guide is designed to teach practical structure, risk reading,
                        disciplined setup interpretation, and long-term signal survival.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                        <span className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-black">
                            $19
                        </span>

                        <Link
                            href="/access-pending"
                            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white/70 hover:border-emerald-300/30"
                        >
                            Secure Early Access
                        </Link>
                    </div>
                </div>

                <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
                    <div className="mb-4 flex items-center gap-2 text-emerald-300">
                        <Sparkles className="h-5 w-5" />
                        <p className="text-sm uppercase tracking-[0.24em]">
                            Included Inside
                        </p>
                    </div>

                    <div className="grid gap-3">
                        {included.map((item) => (
                            <div
                                key={item}
                                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 p-4"
                            >
                                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                                <p className="text-sm leading-7 text-white/70">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 rounded-[1.75rem] border border-emerald-300/20 bg-emerald-300/10 p-6">
                    <div className="flex items-start gap-3">
                        <Lock className="mt-1 h-5 w-5 text-emerald-300" />
                        <div>
                            <h3 className="text-xl font-black">
                                Checkout route intentionally staged.
                            </h3>
                            <p className="mt-2 text-sm leading-7 text-white/65">
                                This product page now gives the guide a real monetization route.
                                The next monetization phase can connect checkout, PDF delivery,
                                member file unlocks, or protected digital access.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}