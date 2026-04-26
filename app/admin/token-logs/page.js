"use client";

import { useEffect, useMemo, useState } from "react";

const LABELS = [
  "watch",
  "high_interest",
  "revisit",
  "dead",
  "premium_candidate",
];

function formatNumber(value) {
  if (value === null || value === undefined || value === "") return "—";

  const num = Number(value);
  if (Number.isNaN(num)) return value;

  if (num >= 1000000000) return `$${(num / 1000000000).toFixed(2)}B`;
  if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
  if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;

  return `$${num.toFixed(2)}`;
}

function badgeStyle(type) {
  const map = {
    SAFE: "border-emerald-300/35 bg-emerald-300/10 text-emerald-200",
    LOW: "border-emerald-300/35 bg-emerald-300/10 text-emerald-200",
    MEDIUM: "border-yellow-300/35 bg-yellow-300/10 text-yellow-200",
    CAUTION: "border-yellow-300/35 bg-yellow-300/10 text-yellow-200",
    HIGH: "border-red-300/35 bg-red-300/10 text-red-200",
    DANGER: "border-red-300/35 bg-red-300/10 text-red-200",
  };

  return map[type] || "border-white/15 bg-white/5 text-white/60";
}

export default function TokenLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState("");
  const [search, setSearch] = useState("");
  const [sortMode, setSortMode] = useState("recent");
  const [riskFilter, setRiskFilter] = useState("all");

  async function loadLogs() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/token-logs");
      const data = await res.json();
      setLogs(data.logs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLogs();
  }, []);

  async function saveOperator(log) {
    try {
      setSavingId(log.id);

      await fetch("/api/admin/token-notes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: log.id,
          operator_note: log.operator_note || "",
          operator_label: log.operator_label || "watch",
        }),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSavingId("");
    }
  }

  function updateLocal(id, field, value) {
    setLogs((current) =>
      current.map((log) =>
        log.id === id ? { ...log, [field]: value } : log
      )
    );
  }

  const filteredLogs = useMemo(() => {
    let base = logs.filter((log) => {
      const text =
        `${log.contract} ${log.token_name} ${log.token_symbol} ${log.latest_risk} ${log.latest_setup} ${log.latest_source} ${log.operator_note || ""} ${log.operator_label || ""}`.toLowerCase();

      const searchPass = text.includes(search.toLowerCase());

      const currentRisk = (log.latest_risk || "").toUpperCase();

      const riskPass =
        riskFilter === "all" ? true : currentRisk.includes(riskFilter);

      return searchPass && riskPass;
    });

    if (sortMode === "checks") {
      base.sort((a, b) => Number(b.check_count || 0) - Number(a.check_count || 0));
    } else if (sortMode === "score") {
      base.sort((a, b) => Number(b.latest_score || 0) - Number(a.latest_score || 0));
    } else {
      base.sort(
        (a, b) =>
          new Date(b.last_checked_at || 0).getTime() -
          new Date(a.last_checked_at || 0).getTime()
      );
    }

    return base;
  }, [logs, search, sortMode, riskFilter]);

  const totalChecks = filteredLogs.reduce(
    (sum, log) => sum + Number(log.check_count || 0),
    0
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
        <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-black to-emerald-900/20 p-6 shadow-[0_0_80px_rgba(16,185,129,0.12)] sm:p-8">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-emerald-300">
                Trust The Signal Intelligence Archive
              </p>

              <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
                Token Check Logs + Operator Memory
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-6 text-white/60 sm:text-base">
                Hybrid machine intelligence + manual operator conviction memory.
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a href="/" className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold">Home</a>
              <a href="/admin" className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold">Admin Home</a>
              <button onClick={loadLogs} className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold">Refresh</button>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="text-xs font-black uppercase tracking-[0.3em] text-white/35">Visible Tokens</div>
            <div className="mt-3 text-5xl font-black">{filteredLogs.length}</div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="text-xs font-black uppercase tracking-[0.3em] text-white/35">Total Checks</div>
            <div className="mt-3 text-5xl font-black">{totalChecks}</div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.4fr_0.7fr_0.7fr]">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contract, token, risk, notes, labels..."
            className="w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 outline-none"
          />

          <select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value)}
            className="rounded-2xl border border-white/10 bg-black/50 px-5 py-4 outline-none"
          >
            <option value="recent">Sort: Recent</option>
            <option value="checks">Sort: Most Checked</option>
            <option value="score">Sort: Highest Score</option>
          </select>

          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="rounded-2xl border border-white/10 bg-black/50 px-5 py-4 outline-none"
          >
            <option value="all">Risk: All</option>
            <option value="LOW">LOW / SAFE</option>
            <option value="MEDIUM">MEDIUM / CAUTION</option>
            <option value="HIGH">HIGH / DANGER</option>
          </select>
        </div>

        <div className="space-y-6">
          {!loading &&
            filteredLogs.map((log) => (
              <div key={log.id} className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
                <div className="flex flex-wrap justify-between gap-4 items-start">
                  <div>
                    <div className="flex gap-3 flex-wrap mb-3">
                      <span className="rounded-full border border-emerald-300/35 bg-emerald-300/10 px-3 py-1 text-xs font-black text-emerald-200">SOLANA</span>
                      <span className={`rounded-full px-3 py-1 text-xs font-black ${badgeStyle((log.latest_risk || "").split(" ")[0])}`}>
                        {log.latest_risk || "UNKNOWN"}
                      </span>
                      <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-black text-cyan-200">
                        {log.operator_label || "watch"}
                      </span>
                    </div>

                    <h2 className="text-3xl font-black">
                      {log.token_name || "Unknown Token"} ({log.token_symbol || "?"})
                    </h2>

                    <div className="mt-1 text-sm text-white/35 break-all">{log.contract}</div>
                  </div>

                  <div className="flex gap-3 flex-wrap">
                    <a href={`/token/${log.contract}`} className="rounded-2xl border border-emerald-300/25 bg-emerald-300/10 px-4 py-3 text-sm font-black text-emerald-200">
                      Open Dossier
                    </a>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-4 text-sm">
                  <div>Score: <span className="font-black">{log.latest_score ?? "—"}</span></div>
                  <div>Market Cap: <span className="font-black">{formatNumber(log.market_cap)}</span></div>
                  <div>Liquidity: <span className="font-black">{formatNumber(log.liquidity)}</span></div>
                  <div>24H Volume: <span className="font-black">{formatNumber(log.volume_24h)}</span></div>
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-[220px_1fr_150px]">
                  <select
                    value={log.operator_label || "watch"}
                    onChange={(e) => updateLocal(log.id, "operator_label", e.target.value)}
                    className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 outline-none"
                  >
                    {LABELS.map((label) => (
                      <option key={label} value={label}>{label}</option>
                    ))}
                  </select>

                  <textarea
                    value={log.operator_note || ""}
                    onChange={(e) => updateLocal(log.id, "operator_note", e.target.value)}
                    placeholder="Operator note / conviction / revisit reason..."
                    className="min-h-[90px] rounded-2xl border border-white/10 bg-black/40 px-4 py-4 outline-none"
                  />

                  <button
                    onClick={() => saveOperator(log)}
                    className="rounded-2xl bg-emerald-400 px-5 py-4 font-black text-black hover:bg-emerald-300"
                  >
                    {savingId === log.id ? "Saving..." : "Save Intel"}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}