import Link from "next/link";
import {
    Clock3,
    Eye,
    CheckCircle2,
    ArrowRight,
} from "lucide-react";

const pendingNotes = [
    "Protected requests are being captured into the operator queue",
    "Priority notice goes to early registrants",
    "Future product releases route here first",
    "Private signal access invitations route here first",
];

export default function AccessPendingPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,170,0.16),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.07),transparent_18%)]" />

            <section className="relative mx-auto flex max-w-5xl flex-col px-5 py-8 sm:px-8">
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
                                ACCESS PENDING
                            </h1>
                        </div>
                    </div>

                    <Link
                        href="/protected"
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 hover:border-emerald-300/30"
                    >
                        Protected
                    </Link>
                </header>

                <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-black to-emerald-900/20 p-8 text-center shadow-[0_0_80px_rgba(16,185,129,0.12)]">
                    <Clock3 className="mx-auto h-8 w-8 text-emerald-300" />

                    <p className="mt-5 text-sm uppercase tracking-[0.28em] text-emerald-300">
                        Queue Placement Confirmed
                    </p>

                    <h2 className="mt-3 text-4xl font-black sm:text-6xl">
                        Access route staged.
                    </h2>

                    <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/65">
                        This pending page acts as the temporary holding route for early
                        registrants while protected signal rooms, premium member routes,
                        digital product fulfillment, and gated operator systems are being
                        finalized.
                    </p>

                    <Link
                        href="/"
                        className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-emerald-400 px-6 py-4 text-sm font-black text-black hover:bg-emerald-300"
                    >
                        Return Home <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="mt-8 grid gap-4">
                    {pendingNotes.map((note) => (
                        <div
                            key={note}
                            className="flex items-start gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5"
                        >
                            <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-300" />
                            <p className="text-sm leading-7 text-white/70">{note}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}