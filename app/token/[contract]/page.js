"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  Eye,
  Radar,
  Loader2,
  AlertTriangle,
  ExternalLink,
  ArrowLeft,
  ShieldCheck,
  TrendingUp,
  Lock,
  BookOpen,
  Send,
  MessageCircle,
  CheckCircle2,
  FileSearch,
  Activity,
  Database,
  Copy,
  Wallet,
  Brain,
} from "lucide-react";

const formatNum = (num) => {
  if (!num && num !== 0) return "--";
  return Number(num).toLocaleString();
};

const shortAddress = (address) => {
  if (!address) return "--";
  if (address.length <= 16) return address;
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
};

const clampBar = (num) => Math.max(0, Math.min(100, Number(num || 0)));

const riskTone = (value = "") => {
  const upper = String(value).toUpperCase();

  if (upper.includes("LOW") || upper.includes("SAFE")) {
    return "border-emerald-300/35 bg-emerald-300/10 text-emerald-200";
  }
  if (upper.includes("MEDIUM") || upper.includes("CAUTION")) {
    return "border-yellow-300/35 bg-yellow-300/10 text-yellow-200";
  }
  if (upper.includes("HIGH") || upper.includes("DANGER")) {
    return "border-red-300/35 bg-red-300/10 text-red-200";
  }
  return "border-white/15 bg-white/5 text-white/60";
};

const receiptType = (log, liveData) => {
  const score = Number(liveData?.score || log?.latest_score || 0);
  const risk = String(liveData?.risk || log?.latest_risk || "").toUpperCase();
  const label = String(log?.operator_label || "").toLowerCase();

  if (label === "high_interest" || label === "premium_candidate") return "operator_high_interest";
  if (risk.includes("LOW") && score >= 75) return "strong_signal";
  if (risk.includes("MEDIUM") || risk.includes("CAUTION")) return "caution_signal";
  if (risk.includes("HIGH") || risk.includes("DANGER")) return "risk_blocked";

  return "archived_signal";
};

const memoryConfidence = (checks = 0, note = "") => {
  if (note && checks >= 3) return "High";
  if (checks >= 3) return "Medium";
  if (checks > 0) return "Developing";
  return "Fresh";
};

const labelTone = (value = "") => {
  const v = String(value).toLowerCase();

  if (v === "high_interest") return "border-emerald-300/25 bg-emerald-300/10 text-emerald-200";
  if (v === "revisit") return "border-yellow-300/25 bg-yellow-300/10 text-yellow-200";
  if (v === "dead") return "border-red-300/25 bg-red-300/10 text-red-200";
  if (v === "premium_candidate") return "border-purple-300/25 bg-purple-300/10 text-purple-200";

  return "border-cyan-300/25 bg-cyan-300/10 text-cyan-200";
};

const Card = ({ children, className = "" }) => (
  <div className={`rounded-[28px] border border-white/10 bg-white/[0.055] shadow-2xl shadow-emerald-500/10 backdrop-blur-xl ${className}`}>
    {children}
  </div>
);

const ScoreBar = ({ label, value }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
    <div className="mb-2 flex items-center justify-between">
      <p className="text-xs uppercase tracking-[0.22em] text-white/40">{label}</p>
      <p className="text-sm font-semibold text-emerald-200">{value ?? 0}/100</p>
    </div>
    <div className="h-2 overflow-hidden rounded-full bg-white/10">
      <div className="h-full rounded-full bg-emerald-300" style={{ width: `${clampBar(value)}%` }} />
    </div>
  </div>
);

const ActionLink = ({ href, children, variant = "solid" }) => (
  <a
    href={href}
    target={href?.startsWith("http") ? "_blank" : undefined}
    rel={href?.startsWith("http") ? "noreferrer" : undefined}
    className={
      variant === "outline"
        ? "inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white/75 transition hover:border-emerald-300/30 hover:text-white"
        : "inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 py-3 font-semibold text-black transition hover:bg-emerald-300"
    }
  >
    {children}
  </a>
);

export default function TokenPage() {
  const params = useParams();
  const contract = params?.contract ? decodeURIComponent(params.contract) : "";

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [memoryData, setMemoryData] = useState(null);
  const [relatedReceipts, setRelatedReceipts] = useState([]);
  const [error, setError] = useState("");
  const [accessEmail, setAccessEmail] = useState("");
  const [accessSubmitted, setAccessSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const runCheck = async () => {
      if (!contract) return;

      setLoading(true);
      setError("");

      try {
        const [signalResponse, memoryResponse, receiptsResponse] = await Promise.all([
          fetch("/api/signal-check", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contract }),
          }),
          fetch(`/api/token-memory?q=${encodeURIComponent(contract)}`, {
            cache: "no-store",
          }),
          fetch("/api/signal-receipts", {
            cache: "no-store",
          }),
        ]);

        const signalJson = await signalResponse.json();
        const memoryJson = await memoryResponse.json();
        const receiptsJson = await receiptsResponse.json();

        if (!signalJson.success) {
          setError(signalJson.error || "Unable to analyze token.");
        } else {
          setData(signalJson.result);
        }

        if (memoryJson.success && memoryJson.logs?.length > 0) {
          setMemoryData(memoryJson.logs[0]);
        }

        if (receiptsJson.success && Array.isArray(receiptsJson.receipts)) {
          setRelatedReceipts(
            receiptsJson.receipts
              .filter((r) => r.contract !== contract)
              .slice(0, 3)
          );
        }

        if (receiptsJson.success && Array.isArray(receiptsJson.receipts)) {
          setRelatedReceipts(
            receiptsJson.receipts.filter((r) => r.contract !== contract).slice(0, 3)
          );
        }
      } catch (err) {
        setError("Token intelligence route failed.");
      }

      setLoading(false);
    };

    runCheck();
  }, [contract]);

  const submitAccessRequest = async () => {
    const contact = accessEmail.trim();
    if (!contact) return;

    try {
      const response = await fetch("/api/access-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, source: "token_page_access_capture", contract }),
      });

      const result = await response.json();
      if (!result.success) throw new Error();

      setAccessSubmitted(true);
      setError("");
    } catch {
      setError("The access route could not capture this request. Try again.");
    }
  };

  const copyContract = async () => {
    await navigator.clipboard.writeText(contract);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const archivedChecks = useMemo(() => memoryData?.check_count || 0, [memoryData]);
  const operatorLabel = memoryData?.operator_label || "watch";
  const operatorNote = memoryData?.operator_note || "";
  const currentReceiptType = receiptType(memoryData, data);
  const currentMemoryConfidence = memoryConfidence(archivedChecks, operatorNote);

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,170,0.18),transparent_34%),radial-gradient(circle_at_78%_16%,rgba(255,255,255,0.08),transparent_17%),radial-gradient(circle_at_12%_78%,rgba(0,180,140,0.14),transparent_25%)]" />
      <div className="fixed inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <header className="flex items-center justify-between rounded-3xl border border-white/10 bg-black/50 px-4 sm:px-5 py-4 shadow-2xl shadow-emerald-500/10 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10">
              <Eye className="h-5 w-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-white/45">
                TRUST THE SIGNAL
              </p>
              <h1 className="text-sm sm:text-lg font-semibold tracking-[0.2em]">
                TOKEN DOSSIER V7
              </h1>
            </div>
          </div>

          <div className="flex gap-3">
            <ActionLink href="/tools" variant="outline">Tools</ActionLink>
            <ActionLink href="/tools/token-memory" variant="outline">Memory</ActionLink>
            <ActionLink href="/trending" variant="outline">
              <ArrowLeft className="h-4 w-4" />
              Trending
            </ActionLink>
          </div>
        </header>

        <section className="grid gap-8 pt-16 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <div className="mb-5 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/75">👁️ Token.Dossier.Live</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/75">📡 Signal.Engine</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/75">🧠 Hybrid.Memory</span>
              <span className={`rounded-full border px-4 py-1.5 text-sm ${labelTone(operatorLabel)}`}>{currentReceiptType}</span>
            </div>

            <p className="text-sm uppercase tracking-[0.24em] text-emerald-300">
              Full Contract Intelligence Report + Archived Conviction
            </p>

            <h2 className="mt-2 text-3xl font-semibold md:text-5xl break-words">
              {data ? `${data.name} (${data.symbol})` : shortAddress(contract)}
            </h2>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65">
              Dedicated live dossier generated through the Trust The Signal weighted authority layer, now synced with archived platform memory, related receipts, and operator intelligence.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={copyContract}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75 hover:border-emerald-300/30"
              >
                <span className="inline-flex items-center gap-2">
                  <Copy className="h-4 w-4" />
                  {copied ? "Copied" : "Copy Contract"}
                </span>
              </button>

              <ActionLink href={`/?contract=${encodeURIComponent(contract)}`} variant="outline">
                <ShieldCheck className="h-4 w-4" />
                Run Homepage Check
              </ActionLink>

              <ActionLink href="/tools/wallet-snapshot" variant="outline">
                <Wallet className="h-4 w-4" />
                Wallet Snapshot
              </ActionLink>
            </div>
          </div>

          <Card className="p-6">
            <div className="mb-3 flex items-center gap-2 text-emerald-300">
              <Brain className="h-5 w-5" />
              <p className="text-sm uppercase tracking-[0.24em]">Intelligence Memory Sync</p>
            </div>

            <div className="grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/35">Archived Checks</p>
                <p className="mt-2 text-2xl font-black text-emerald-200">{archivedChecks}</p>
              </div>

              <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Memory Confidence</p>
                <p className="mt-2 text-xl font-black">{currentMemoryConfidence}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/35">Receipt Type</p>
                <p className="mt-2 text-xl font-black text-emerald-200">{currentReceiptType}</p>
              </div>

              <div className={`rounded-2xl border p-4 ${labelTone(operatorLabel)}`}>
                <p className="text-xs uppercase tracking-[0.2em]">Operator Label</p>
                <p className="mt-2 text-xl font-black">{operatorLabel}</p>
              </div>

              {operatorNote ? (
                <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Operator Note</p>
                  <p className="mt-2 text-sm leading-7 text-white/70">{operatorNote}</p>
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-white/45">
                  No archived operator note saved for this token yet.
                </div>
              )}

              <ActionLink href={`/tools/token-memory?q=${encodeURIComponent(contract)}`} variant="outline">
                <Database className="h-4 w-4" />
                Open Full Memory Search
              </ActionLink>

              <ActionLink href="/receipts" variant="outline">
                <ExternalLink className="h-4 w-4" />
                View Signal Receipts
              </ActionLink>
            </div>
          </Card>
        </section>

        {loading && (
          <div className="flex min-h-[320px] items-center justify-center">
            <div className="flex items-center gap-3 text-emerald-300">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Generating live token dossier...</span>
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="mt-10 rounded-3xl border border-red-400/20 bg-red-400/10 p-6 text-red-100">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          </div>
        )}

        {!loading && data && (
          <>
            <section className="grid gap-4 pt-12 md:grid-cols-4">
              {[
                ["Final Score", `${data.score}/100`],
                ["Verdict", data.verdict],
                ["Signal", data.signal],
                ["Risk", data.risk],
                ["DEX", data.dex],
                ["Source Health", data.sourceHealth],
                ["Liquidity", `$${formatNum(data.liquidity)}`],
                ["24H Volume", `$${formatNum(data.volume24h)}`],
                ["Market Cap", `$${formatNum(data.marketCap)}`],
                ["24H Change", `${data.priceChange24h}%`],
                ["Pair Age", data.pairAge],
                ["Quote", data.quoteToken || "--"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/40">{label}</p>
                  <p className={`mt-2 break-words text-base font-medium ${label === "Risk" ? riskTone(value) : "text-emerald-200 border-0 bg-transparent p-0"}`}>
                    {value || "--"}
                  </p>
                </div>
              ))}
            </section>

            <section className="grid gap-4 pt-10 md:grid-cols-2 xl:grid-cols-3">
              <ScoreBar label="Liquidity" value={data.breakdown?.liquidity} />
              <ScoreBar label="Volume" value={data.breakdown?.volume} />
              <ScoreBar label="Balance" value={data.breakdown?.liquidityBalance} />
              <ScoreBar label="Momentum" value={data.breakdown?.momentum} />
              <ScoreBar label="Age" value={data.breakdown?.age} />
              <ScoreBar label="Transactions" value={data.breakdown?.transactions} />
            </section>

            <section className="grid gap-6 pt-10 lg:grid-cols-2">
              <Card className="p-6">
                <div className="mb-3 flex items-center gap-2 text-emerald-300">
                  <Activity className="h-5 w-5" />
                  <p className="text-sm uppercase tracking-[0.24em]">Risk Flag Layer</p>
                </div>

                {data.riskFlags?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {data.riskFlags.map((flag) => (
                      <span key={flag} className="rounded-full border border-yellow-300/25 bg-yellow-300/10 px-3 py-1 text-xs font-bold text-yellow-100">
                        {flag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-emerald-200">No major automated structural risk flags detected.</p>
                )}
              </Card>

              <Card className="p-6">
                <div className="mb-3 flex items-center gap-2 text-emerald-300">
                  <Radar className="h-5 w-5" />
                  <p className="text-sm uppercase tracking-[0.24em]">Source Presence</p>
                </div>

                <div className="grid gap-3">
                  {[
                    ["Website", data.socialPresence?.hasWebsite ? "Detected" : "Not Detected"],
                    ["Socials", `${data.socialPresence?.socialCount ?? 0}`],
                    ["Source Health", data.sourceHealth || "limited_presence"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/40">{label}</p>
                      <p className="mt-2 font-medium text-emerald-200">{value}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            <section className="pt-10">
              <div className="mb-5 flex items-center gap-2 text-emerald-300">
                <Database className="h-5 w-5" />
                <p className="text-sm uppercase tracking-[0.24em]">Related Signal Receipts</p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {relatedReceipts.map((receipt) => (
                  <Card key={receipt.id}>
                    <div className="p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-emerald-200">
                          {receipt.receiptType}
                        </span>
                        <span className="text-xs text-white/35">{receipt.checkCount || 0} checks</span>
                      </div>

                      <h3 className="text-lg font-semibold">
                        {receipt.tokenName} ({receipt.tokenSymbol})
                      </h3>

                      <p className="mt-2 text-xs text-white/45">
                        Score: {receipt.score ?? "--"} • {receipt.risk || "--"}
                      </p>

                      <div className="mt-4 flex gap-2">
                        <a href={`/token/${receipt.contract}`} className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-[11px] font-black text-emerald-200">
                          Open
                        </a>
                        <a href={`/tools/token-memory?q=${receipt.contract}`} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-black text-white/70">
                          Memory
                        </a>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            <section className="pt-10">
              <Card className="border-emerald-400/20 bg-gradient-to-br from-emerald-400/15 via-white/[0.05] to-black p-6">
                <div className="mb-6">
                  <div className="mb-3 flex items-center gap-2 text-emerald-300">
                    <Brain className="h-5 w-5" />
                    <p className="text-sm uppercase tracking-[0.24em]">Dossier Authority Interpretation</p>
                  </div>

                  <p className="max-w-3xl text-sm leading-7 text-white/65">
                    This report combines live signal scoring, archived memory, repeated check behavior, related archived receipts, operator labeling, and protected continuation routing into one token intelligence page.
                  </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                  <ActionLink href="/trending" variant="outline"><TrendingUp className="h-4 w-4" />Trending Board</ActionLink>
                  <ActionLink href="/tools/token-memory" variant="outline"><Database className="h-4 w-4" />Token Memory</ActionLink>
                  <ActionLink href="/" variant="solid"><FileSearch className="h-4 w-4" />Analyze Another Contract</ActionLink>
                </div>
              </Card>
            </section>


            <section className="pt-10">
              <div className="mb-5 flex items-center gap-2 text-emerald-300">
                <Database className="h-5 w-5" />
                <p className="text-sm uppercase tracking-[0.24em]">
                  Related Signal Receipts
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {relatedReceipts.map((receipt) => (
                  <Card key={receipt.id} className="h-full">
                    <div className="p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-emerald-200">
                          {receipt.receiptType}
                        </span>

                        <span className="text-xs text-white/35">
                          {receipt.checkCount || 0} checks
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold">
                        {receipt.tokenName} ({receipt.tokenSymbol})
                      </h3>

                      <p className="mt-2 text-xs text-white/45">
                        Score: {receipt.score ?? "--"} • {receipt.risk || "--"}
                      </p>

                      <div className="mt-4 flex gap-2">
                        <a
                          href={`/token/${receipt.contract}`}
                          className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-[11px] font-black text-emerald-200"
                        >
                          Open
                        </a>

                        <a
                          href={`/tools/token-memory?q=${receipt.contract}`}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-black text-white/70"
                        >
                          Memory
                        </a>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            <section className="pt-10">
              <Card className="border-emerald-400/20 bg-gradient-to-br from-emerald-400/15 via-white/[0.05] to-black p-6">
                <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                  <div>
                    <div className="mb-3 flex items-center gap-2 text-emerald-300">
                      <Lock className="h-5 w-5" />
                      <p className="text-sm uppercase tracking-[0.24em]">Protected Continuation</p>
                    </div>

                    <h2 className="text-3xl font-semibold">
                      Want this intelligence connected to future private alerts?
                    </h2>

                    <p className="mt-4 leading-8 text-white/65">
                      Enter the protected access queue for scanner upgrades, private routes, gated rooms, premium guides, and member intelligence releases.
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-col gap-3 md:flex-row">
                      <input
                        value={accessEmail}
                        onChange={(e) => setAccessEmail(e.target.value)}
                        placeholder="Email or preferred contact..."
                        className="h-12 flex-1 rounded-2xl border border-white/10 bg-black/30 px-4 text-white outline-none"
                      />

                      <button
                        onClick={submitAccessRequest}
                        className="h-12 rounded-2xl bg-emerald-400 px-6 font-semibold text-black hover:bg-emerald-300"
                      >
                        {accessSubmitted ? "Request Captured" : "Request Access"}
                      </button>
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      {[
                        [Send, "Telegram Alerts"],
                        [MessageCircle, "Discord Access"],
                        [Lock, "Protected Rooms"],
                        [BookOpen, "Premium Guides"],
                      ].map(([Icon, label]) => (
                        <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 p-3">
                          <Icon className="h-4 w-4 text-emerald-300" />
                          <p className="text-sm text-white/70">{label}</p>
                        </div>
                      ))}
                    </div>

                    {accessSubmitted && (
                      <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-3 text-sm text-emerald-100">
                        <span className="inline-flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          Access request captured successfully.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
