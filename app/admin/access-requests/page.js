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
    Trash2,
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

const statusStyles = {
    new_access_request: "bg-emerald-400/10 text-emerald-200 border-emerald-400/20",
    reviewing: "bg-blue-400/10 text-blue-200 border-blue-400/20",
    contacted: "bg-yellow-400/10 text-yellow-100 border-yellow-400/20",
    accepted: "bg-purple-400/10 text-purple-100 border-purple-400/20",
    archived: "bg-white/10 text-white/55 border-white/10",
};

const RequestRow = ({ request, onRefresh }) => {
    const [copied, setCopied] = useState(false);
    const [busy, setBusy] = useState(false);

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

    const updateStatus = async (status) => {
        setBusy(true);

        await fetch("/api/admin/access-requests", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: request.id,
                status,
            }),
        });

        setBusy(false);
        onRefresh();
    };

    const deleteRequest = async () => {
        setBusy(true);

        await fetch("/api/admin/access-requests", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: request.id,
            }),
        });

        setBusy(false);
        onRefresh();
    };

    return (
        <Card>
            <div className="grid gap-5 p-5 xl:grid-cols-[1.05fr_0.7fr_1fr_0.9fr_auto] xl:items-start">
                <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/35">
                        Contact
                    </p>
                    <p className="mt-2 break-all font-mono text-sm text-emerald-200">
                        {request.contact || "--"}
                    </p>

                    <button
                        onClick={copyContact}
                        className="mt-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70"
                    >
                        <span className="inline-flex items-center gap-2">
                            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            {copied ? "Copied" : "Copy"}
                        </span>
                    </button>
                </div>

                <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/35">
                        Source
                    </p>
                    <p className="mt-2 text-sm text-white/75">{request.source || "--"}</p>

                    <div
                        className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs ${statusStyles[request.status] || statusStyles.new_access_request
                            }`}
                    >
                        {request.status}
                    </div>
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

                <div className="grid gap-2">
                    <select
                        disabled={busy}
                        value={request.status}
                        onChange={(e) => updateStatus(e.target.value)}
                        className="rounded-xl border border-white/10 bg-black px-3 py-2 text-xs text-white"
                    >
                        <option value="new_access_request">new_access_request</option>
                        <option value="reviewing">reviewing</option>
                        <option value="contacted">contacted</option>
                        <option value="accepted">accepted</option>
                        <option value="archived">archived</option>
                    </select>

                    <button
                        disabled={busy}
                        onClick={deleteRequest}
                        className="rounded-xl border border-red-400/20 bg-red-400/10 px-3 py-2 text-xs text-red-100"
                    >
                        <span className="inline-flex items-center gap-2">
                            <Trash2 className="h-3 w-3" />
                            Delete
                        </span>
                    </button>
                </div>
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
    }, []); return (
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
                            🧠 Lead Management
                        </span>
                    </div>

                    <h2 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
                        Captured contacts.
                        <span className="block bg-gradient-to-r from-emerald-200 via-emerald-400 to-white bg-clip-text text-transparent">
                            Managed pipeline.
                        </span>
                    </h2>

                    <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
                        Review, mark, contact, archive, and delete protected access leads.
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
                                Route
                            </p>
                            <p className="mt-2 text-2xl font-semibold text-emerald-300">
                                Active
                            </p>
                        </div>
                    </Card>

                    <Card>
                        <div className="p-5">
                            <p className="text-xs uppercase tracking-[0.22em] text-white/35">
                                Storage
                            </p>
                            <p className="mt-2 text-2xl font-semibold text-emerald-300">
                                Persistent
                            </p>
                        </div>
                    </Card>
                </section>

                <section className="pt-8">
                    <div className="mb-5 flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm uppercase tracking-[0.24em] text-emerald-300">
                                Captured Leads
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
                            </div>
                        </Card>
                    )}

                    {!loading && !error && requests.length > 0 && (
                        <div className="space-y-4">
                            {requests.map((request) => (
                                <RequestRow
                                    key={request.id || request.createdAt}
                                    request={request}
                                    onRefresh={() => loadRequests({ refresh: true })}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}