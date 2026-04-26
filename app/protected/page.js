import Link from "next/link";
import {
    Lock,
    ShieldCheck,
    Eye,
    ArrowRight,
    CheckCircle2,
} from "lucide-react";

const layers = [
    "Protected signal rooms",
    "Private scanner updates",
    "Member intelligence notes",
    "Premium product drops",
    "Operator-only alerts",
    "Future gated dashboards",
];

export default function ProtectedPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,170,0.16),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.07),transparent_18%)]" />

            <section className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8">
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
                                PROTECTED ACCESS
                            </h1>
                        </div>
                    </div>

                    <Link
                        href="/"
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 hover:border-emerald-300/30"
                    >
                        Home
                    </Link>
                </header>

                <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-black to-emerald-900/20 p-6 shadow-[0_0_80px_rgba(16,185,129,0.12)] sm:p-8">
                    <div className="mb-4 flex items-center gap-2 text-emerald-300">
                        <Lock className="h-5 w-5" />
                        <p className="text-sm uppercase tracking-[0.28em]">
                            Protected Operator Preparation
                        </p>
                    </div>

                    <h2 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
                        This route is being prepared for deeper signal access.
                    </h2>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-white/65">
                        Trust The Signal is expanding beyond public tools into protected
                        operator layers, premium rooms, private notes, gated dashboards,
                        scanner upgrades, and member intelligence releases.
                    </p>

                    <Link
                        href="/access-pending"
                        className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-emerald-400 px-6 py-4 text-sm font-black text-black hover:bg-emerald-300"
                    >
                        Secure Queue Placement <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {layers.map((layer) => (
                        <div
                            key={layer}
                            className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5"
                        >
                            <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                            <p className="mt-4 text-base font-bold">{layer}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 rounded-[1.75rem] border border-emerald-300/20 bg-emerald-300/10 p-6">
                    <div className="flex items-start gap-3">
                        <ShieldCheck className="mt-1 h-5 w-5 text-emerald-300" />
                        <div>
                            <h3 className="text-xl font-black">
                                This page now acts as the ecosystem gateway.
                            </h3>
                            <p className="mt-2 text-sm leading-7 text-white/65">
                                Future member logins, private dashboards, scanner alerts, Discord
                                verification, Telegram access, and gated downloads can all route
                                through this protected layer.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}