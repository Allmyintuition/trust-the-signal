"use client";

import { useEffect, useMemo, useState } from "react";

const STATUS_OPTIONS = [
  "new_access_request",
  "reviewing",
  "contacted",
  "accepted",
  "archived",
];

const STATUS_LABELS = {
  new_access_request: "New",
  reviewing: "Reviewing",
  contacted: "Contacted",
  accepted: "Accepted",
  archived: "Archived",
};

const STATUS_STYLES = {
  new_access_request: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
  reviewing: "border-cyan-400/40 bg-cyan-400/10 text-cyan-200",
  contacted: "border-yellow-400/40 bg-yellow-400/10 text-yellow-200",
  accepted: "border-purple-400/40 bg-purple-400/10 text-purple-200",
  archived: "border-white/20 bg-white/5 text-white/50",
};

const PRIORITY_STYLES = {
  high: "border-red-400/40 bg-red-400/10 text-red-200",
  medium: "border-yellow-400/40 bg-yellow-400/10 text-yellow-200",
  normal: "border-white/20 bg-white/5 text-white/55",
};

function formatDate(value) {
  if (!value) return "Unknown";
  try {
    return new Date(value).toLocaleString();
  } catch {
    return "Unknown";
  }
}

function shortenWallet(wallet) {
  if (!wallet) return "Not provided";
  if (wallet.length <= 14) return wallet;
  return `${wallet.slice(0, 6)}...${wallet.slice(-6)}`;
}

function getPrimaryContact(request) {
  return (
    request.contact ||
    request.email ||
    request.telegram ||
    request.wallet ||
    "No contact provided"
  );
}

function getSourceLabel(source) {
  if (source === "protected_access_page") return "Protected Lead";
  if (source === "signal_operator_guide_order") return "Guide Buyer";
  return "General Intake";
}

export default function AdminAccessRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  async function loadRequests() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/access-requests", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to load access requests.");
      }

      setRequests(Array.isArray(data.requests) ? data.requests : []);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRequests();
  }, []);

  async function updateRequest(id, updates) {
    try {
      setActionLoadingId(id);
      setError("");

      const response = await fetch("/api/admin/access-requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to update request.");
      }

      setRequests((current) =>
        current.map((item) => (item.id === id ? data.request : item))
      );
    } catch (err) {
      setError(err.message || "Failed to update request.");
    } finally {
      setActionLoadingId(null);
    }
  }

  async function deleteRequest(id) {
    const confirmed = window.confirm("Delete this access request?");
    if (!confirmed) return;

    try {
      setActionLoadingId(id);
      setError("");

      const response = await fetch(`/api/admin/access-requests?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to delete request.");
      }

      setRequests((current) => current.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete request.");
    } finally {
      setActionLoadingId(null);
    }
  }

  async function copyText(id, text) {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(""), 1500);
    } catch {
      setError("Copy failed.");
    }
  }

  function exportCSV() {
    window.open("/api/admin/access-requests?format=csv", "_blank");
  }

  const counts = useMemo(() => {
    const base = {
      total: requests.length,
      protectedLeads: 0,
      guideOrders: 0,
      generalLeads: 0,
      highPriority: 0,
      mediumPriority: 0,
      hotOperator: 0,
    };

    for (const request of requests) {
      const priority = request.outreachPriority || "normal";
      const source = request.source || "";

      if (source === "protected_access_page") base.protectedLeads += 1;
      else if (source === "signal_operator_guide_order") base.guideOrders += 1;
      else base.generalLeads += 1;

      if (priority === "high") base.highPriority += 1;
      if (priority === "medium") base.mediumPriority += 1;
      if ((request.leadScore || 0) >= 75) base.hotOperator += 1;
    }

    return base;
  }, [requests]);

  const filteredRequests = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return requests.filter((request) => {
      const status = request.status || "new_access_request";
      const priority = request.outreachPriority || "normal";
      const source = request.source || "";

      const matchesStatus = statusFilter === "all" ? true : status === statusFilter;
      const matchesPriority = priorityFilter === "all" ? true : priority === priorityFilter;

      const matchesSource =
        sourceFilter === "all"
          ? true
          : sourceFilter === "protected"
          ? source === "protected_access_page"
          : sourceFilter === "guide"
          ? source === "signal_operator_guide_order"
          : source !== "protected_access_page" &&
            source !== "signal_operator_guide_order";

      const searchableText = [
        request.contact,
        request.email,
        request.telegram,
        request.wallet,
        request.status,
        request.source,
        request.message,
        request.leadType,
        request.operatorTag,
        request.adminNotes,
        request.outreachPriority,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = normalizedSearch
        ? searchableText.includes(normalizedSearch)
        : true;

      return matchesStatus && matchesPriority && matchesSource && matchesSearch;
    });
  }, [requests, searchQuery, statusFilter, priorityFilter, sourceFilter]);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">

        <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-black to-cyan-400/10 p-6 shadow-[0_0_80px_rgba(16,185,129,0.12)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-emerald-300">
                Trust The Signal Operator Terminal
              </p>
              <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
                Access Revenue Intelligence
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
                Segmented protected leads, guide buyers, monetization intake, and fulfillment handling.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="/" className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold">Home</a>
              <a href="/admin" className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold">Admin Home</a>
              <button onClick={loadRequests} className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold">
                {loading ? "Refreshing..." : "Refresh"}
              </button>
              <button onClick={exportCSV} className="rounded-2xl border border-emerald-300/40 bg-emerald-300/15 px-5 py-3 text-sm font-black text-emerald-100">
                Export CSV
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">Total Leads</p>
            <p className="mt-3 text-3xl font-black">{counts.total}</p>
          </div>

          <button onClick={() => setSourceFilter("protected")} className="rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-5 text-left">
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-200/70">Protected Leads</p>
            <p className="mt-3 text-3xl font-black text-emerald-100">{counts.protectedLeads}</p>
          </button>

          <button onClick={() => setSourceFilter("guide")} className="rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5 text-left">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/70">Guide Buyers</p>
            <p className="mt-3 text-3xl font-black text-cyan-100">{counts.guideOrders}</p>
          </button>

          <button onClick={() => setSourceFilter("other")} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-left">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">Other Intake</p>
            <p className="mt-3 text-3xl font-black">{counts.generalLeads}</p>
          </button>

          <div className="rounded-3xl border border-red-300/20 bg-red-300/10 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-red-200/70">High Priority</p>
            <p className="mt-3 text-3xl font-black text-red-100">{counts.highPriority}</p>
          </div>

          <div className="rounded-3xl border border-yellow-300/20 bg-yellow-300/10 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-yellow-200/70">Medium Priority</p>
            <p className="mt-3 text-3xl font-black text-yellow-100">{counts.mediumPriority}</p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_180px_180px_180px]">
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search leads..."
            className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-4 text-sm outline-none placeholder:text-white/30"
          />

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-2xl border border-white/10 bg-black/60 px-4 py-4 text-sm font-bold outline-none">
            <option value="all">All Statuses</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>{STATUS_LABELS[status]}</option>
            ))}
          </select>

          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="rounded-2xl border border-white/10 bg-black/60 px-4 py-4 text-sm font-bold outline-none">
            <option value="all">All Priority</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="normal">Normal Priority</option>
          </select>

          <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)} className="rounded-2xl border border-white/10 bg-black/60 px-4 py-4 text-sm font-bold outline-none">
            <option value="all">All Sources</option>
            <option value="protected">Protected Leads</option>
            <option value="guide">Guide Buyers</option>
            <option value="other">Other Intake</option>
          </select>
        </div>

        {error && <div className="rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm font-bold text-red-200">{error}</div>}

        <p className="text-sm font-bold text-white/50">
          Showing <span className="text-emerald-200">{filteredRequests.length}</span> of <span className="text-white">{requests.length}</span> requests
        </p>

        <div className="grid gap-5">
          {filteredRequests.map((request) => {
            const status = request.status || "new_access_request";
            const primaryContact = getPrimaryContact(request);
            const priority = request.outreachPriority || "normal";

            return (
              <article key={request.id} className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.18em] ${STATUS_STYLES[status]}`}>
                        {STATUS_LABELS[status]}
                      </span>

                      <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.18em] ${PRIORITY_STYLES[priority] || PRIORITY_STYLES.normal}`}>
                        {priority} priority
                      </span>

                      <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                        {getSourceLabel(request.source)}
                      </span>

                      <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-200">
                        Score {request.leadScore || 0}
                      </span>
                    </div>

                    <h2 className="mt-4 break-words text-2xl font-black">{primaryContact}</h2>

                    <p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-white/35">
                      {request.leadType || "general"} • {request.operatorTag || "untagged"} • {formatDate(request.createdAt)}
                    </p>

                    <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-4">
                      <div className="rounded-2xl border border-white/10 bg-black/35 p-4"><p className="text-xs uppercase tracking-[0.2em] text-white/35">Email</p><p className="mt-2 break-words font-bold">{request.email || "Not provided"}</p></div>
                      <div className="rounded-2xl border border-white/10 bg-black/35 p-4"><p className="text-xs uppercase tracking-[0.2em] text-white/35">Telegram</p><p className="mt-2 break-words font-bold">{request.telegram || "Not provided"}</p></div>
                      <div className="rounded-2xl border border-white/10 bg-black/35 p-4"><p className="text-xs uppercase tracking-[0.2em] text-white/35">Wallet</p><p className="mt-2 break-words font-bold">{shortenWallet(request.wallet)}</p></div>
                      <div className="rounded-2xl border border-white/10 bg-black/35 p-4"><p className="text-xs uppercase tracking-[0.2em] text-white/35">Raw Source</p><p className="mt-2 break-words font-bold">{request.source || "Not tracked"}</p></div>
                    </div>

                    {request.message && (
                      <div className="mt-4 rounded-2xl border border-white/10 bg-black/35 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/35">Lead Message</p>
                        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white/70">{request.message}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex w-full flex-col gap-3 xl:w-[300px]">
                    <select
                      value={status}
                      onChange={(event) => updateRequest(request.id, { status: event.target.value })}
                      disabled={actionLoadingId === request.id}
                      className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm font-bold outline-none"
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <option key={option} value={option}>{STATUS_LABELS[option]}</option>
                      ))}
                    </select>

                    <input
                      defaultValue={request.operatorTag || ""}
                      placeholder="Operator tag"
                      onBlur={(event) => updateRequest(request.id, { operatorTag: event.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm font-bold outline-none"
                    />

                    <textarea
                      defaultValue={request.adminNotes || ""}
                      placeholder="Admin notes"
                      onBlur={(event) => updateRequest(request.id, { adminNotes: event.target.value })}
                      className="min-h-24 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm font-bold outline-none"
                    />

                    <button onClick={() => copyText(request.id, primaryContact)} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-bold">
                      {copiedId === request.id ? "Copied" : "Copy Contact"}
                    </button>

                    {request.wallet && (
                      <button onClick={() => copyText(`${request.id}-wallet`, request.wallet)} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-bold">
                        {copiedId === `${request.id}-wallet` ? "Wallet Copied" : "Copy Wallet"}
                      </button>
                    )}

                    <button
                      onClick={() => deleteRequest(request.id)}
                      disabled={actionLoadingId === request.id}
                      className="rounded-2xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm font-black text-red-200"
                    >
                      {actionLoadingId === request.id ? "Processing..." : "Delete"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
