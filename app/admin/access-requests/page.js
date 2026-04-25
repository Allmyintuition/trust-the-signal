"use client";

import React, { useEffect, useState } from "react";
import {
    Eye,
    Loader2,
    AlertTriangle,
    ArrowLeft,
    RefreshCw,
    Inbox,
    Copy,
    Check,
} from "lucide-react";

const Card = ({ children, className = "" }) => (
    <div
        className={`rounded-[28px] border border-white/10 bg-white/[0.055] shadow-2xl shadow-emerald-500/10 backdrop-blur-xl ${className}`}
    >
        {children}
    </div>
);

const formatDate = (value) => {
    if (!value) return "--";

    try {
        return new Date(value).toLocaleString();
    } catch {
        return value;
    }
};

const RequestRow = ({ request }) => {
    const [copied, setCopied] = useState(false);

    const copyContact = async () => {
        if (!request?.contact) return;

        try {
            await navigator.clipboard.writeText(request.contact);
            setCopied(true);
            setTimeout(() => setCopied(false), 1400);
        } catch {
            const textArea = document.createElement("textarea");
            textArea.value = request.contact;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);

            setCopied(true);
            setTimeout(() => setCopied(false), 1400);
        }
    };

    return (
        <Card>
            <div className="grid gap-4 p-5 lg:grid-cols-[1.1fr_0.8fr_1fr_0.9fr_auto] lg:items-center">
                <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/35">
                        Contact
                    </p>
                    <p className="mt-2 break-all font-mono text-sm text-emerald-200">
                        {request.contact || "--"}
                    </p>
                </div>

                <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/35">
                        Source
                    </p>
                    <p className="mt-2 text-sm text-white/75">
                        {request.source || "--"}
                    </p>
                </div>

                <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/35">
                        Contract
                    </p>
                    <p className="mt-2 break-all font-mono text-xs text-white/55">
                        {request.contract || "homepage / no contract"}
                    </p>
                </div>

                <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/35">
                        Captured
                    </p>
                    <p className="mt-2 text-sm text-white/65">
                        {formatDate(request.createdAt)}
                    </p>
                </div>

                <button
                    onClick={copyContact}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/75 transition hover:border-emerald-300/30 hover:text-white"
                >
                    <span className="inline-flex items-center gap-2">
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? "Copied" : "Copy"}
                    </span>
                </button>
            </div>
        </Card>
    );
};

export default function AccessRequestsAdminPage() {
    const [requests, setRequests] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    const loadRequests = async ({ refresh = false } = {}) => {
        if (refresh) setRefreshing(true);
        if (!refresh) setLoading(true);

        try {
            const response = await fetch("/api/admin/access-requests", {
                method: "GET",
                cache: "no-store",
            });

            const json = await response.json();

            if (!json.success) {
                setError(json.error || "Unable to load access requests.");
            } else {
                setRequests(Array.isArray(json.requests) ? json.requests : []);
                setTotal(json.total || 0);
                setError("");
            }
        } catch {
            setError("Admin request route failed.");
        }

        setLoading(false);
        setRefreshing(false);
    };

    useEffect(() => {
        loadRequests();
    }, []);

    return (
        <main className="min-h-screen overflow-hidden bg-black text-white">
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,170,0.18),transparent_34%),radial-gradient(circle_at_78%_16%,rgba(255,255,255,0.08),transparent_17%),radial-gradient(circle_at_12%_78%,rgba(0,180,140,0.14),transparent_25%)]" />
            <div className="fixed inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:48px_48px]" />

            <div className="relative mx-auto max-w-7xl px-6 py-8">
                <header className="flex items-center justify-between rounded-3xl border border-white/10 bg-black/50 px-5 py-4 shadow-2xl shadow-emerald-500/10 backdrop-blur-2xl">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10">
                            <Eye className="h-5 w-5 text-emerald-300" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                                TRUST THE SIGNAL
                            </p>
                            <h1 className="text-lg font-semibold tracking-[0.2em]">
                                ACCESS REQUEST ADMIN
                            </h1>
                        </div>
                    </div>

                    <a
                        href="/"
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 hover:border-emerald-300/30 hover:text-white"
                    >
                        <span className="inline-flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Home
                        </span>
                    </a>
                </header>

                <section className="pt-16">
                    <div className="mb-5 flex flex-wrap gap-3">
                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/75">
                            🔒 Hidden Admin Route
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/75">
                            📥 Backend Capture
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/75">
                            🧠 Phase 19
                        </span>
                    </div>

                    <h2 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
                        Access requests.
                        <span className="block bg-gradient-to-r from-emerald-200 via-emerald-400 to-white bg-clip-text text-transparent">
                            Captured intelligence leads.
                        </span>
                    </h2>

                    <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
                        View contacts submitted through the homepage and token page protected
                        access forms.
                    </p>
                </section>

                <section className="grid gap-4 pt-10 md:grid-cols-3">
                    <Card>
                        <div className="p-5">
                            <p className="text-xs uppercase tracking-[0.22em] text-white/35">
                                Total Requests
                            </p>
                            <p className="mt-2 text-4xl font-semibold text-emerald-300">
                                {total}
                            </p>
                        </div>
                    </Card>

                    <Card>
                        <div className="p-5">
                            <p className="text-xs uppercase tracking-[0.22em] text-white/35">
                                Storage
                            </p>
                            <p className="mt-2 text-2xl font-semibold text-emerald-300">
                                JSON File
                            </p>
                        </div>
                    </Card>

                    <Card>
                        <div className="p-5">
                            <p className="text-xs uppercase tracking-[0.22em] text-white/35">
                                Route
                            </p>
                            <p className="mt-2 text-sm font-mono text-white/65">
                                /api/admin/access-requests
                            </p>
                        </div>
                    </Card>
                </section>

                <section className="pt-8">
                    <div className="mb-5 flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm uppercase tracking-[0.24em] text-emerald-300">
                                Captured Contacts
                            </p>
                            <h3 className="mt-2 text-2xl font-semibold">
                                Latest access requests
                            </h3>
                        </div>

                        <button
                            onClick={() => loadRequests({ refresh: true })}
                            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/75 hover:border-emerald-300/30 hover:text-white"
                        >
                            <span className="inline-flex items-center gap-2">
                                <RefreshCw
                                    className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                                />
                                Refresh
                            </span>
                        </button>
                    </div>

                    {loading && (
                        <Card>
                            <div className="flex min-h-[220px] items-center justify-center p-8 text-emerald-300">
                                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                                Loading access requests...
                            </div>
                        </Card>
                    )}

                    {!loading && error && (
                        <Card className="border-red-400/20 bg-red-400/10">
                            <div className="flex items-center gap-3 p-6 text-red-100">
                                <AlertTriangle className="h-5 w-5" />
                                <p>{error}</p>
                            </div>
                        </Card>
                    )}

                    {!loading && !error && requests.length === 0 && (
                        <Card>
                            <div className="flex flex-col items-center justify-center p-10 text-center">
                                <Inbox className="h-8 w-8 text-emerald-300" />
                                <h3 className="mt-4 text-xl font-semibold">
                                    No access requests captured yet.
                                </h3>
                                <p className="mt-3 max-w-xl text-sm leading-7 text-white/60">
                                    Submit a request from the homepage or a token page, then return
                                    here and refresh.
                                </p>
                            </div>
                        </Card>
                    )}

                    {!loading && !error && requests.length > 0 && (
                        <div className="space-y-4">
                            {requests.map((request) => (
                                <RequestRow key={request.id || request.createdAt} request={request} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}