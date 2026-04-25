import { NextResponse } from "next/server";

const BASE58_SOLANA_REGEX = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

const clamp = (num, min = 0, max = 100) => {
    return Math.max(min, Math.min(max, Math.round(num)));
};

const scoreLiquidity = (liquidity) => {
    if (liquidity >= 250000) return 100;
    if (liquidity >= 100000) return 88;
    if (liquidity >= 50000) return 75;
    if (liquidity >= 25000) return 60;
    if (liquidity >= 10000) return 42;
    if (liquidity >= 5000) return 25;
    return 10;
};

const scoreVolume = (volume24h, liquidity) => {
    if (volume24h <= 0) return 5;
    const ratio = liquidity > 0 ? volume24h / liquidity : 0;

    if (ratio >= 3) return 95;
    if (ratio >= 1.5) return 82;
    if (ratio >= 0.75) return 68;
    if (ratio >= 0.35) return 50;
    if (ratio >= 0.1) return 30;
    return 15;
};

const scoreLiquidityBalance = (liquidity, marketCap) => {
    if (!marketCap || marketCap <= 0 || !liquidity || liquidity <= 0) return 35;

    const ratio = liquidity / marketCap;

    if (ratio >= 0.12) return 95;
    if (ratio >= 0.08) return 85;
    if (ratio >= 0.05) return 72;
    if (ratio >= 0.025) return 55;
    if (ratio >= 0.01) return 35;
    return 15;
};

const scoreMomentum = (priceChange24h, volume24h, liquidity) => {
    const volumeToLiquidity = liquidity > 0 ? volume24h / liquidity : 0;
    let score = 50;

    if (priceChange24h > 80) score += 18;
    else if (priceChange24h > 35) score += 14;
    else if (priceChange24h > 10) score += 10;
    else if (priceChange24h > 0) score += 5;
    else if (priceChange24h < -35) score -= 22;
    else if (priceChange24h < -15) score -= 14;
    else if (priceChange24h < 0) score -= 6;

    if (volumeToLiquidity >= 1) score += 16;
    else if (volumeToLiquidity >= 0.5) score += 9;
    else if (volumeToLiquidity < 0.1) score -= 12;

    return clamp(score);
};

const scoreAge = (pairCreatedAt) => {
    if (!pairCreatedAt) return 45;

    const ageMinutes = (Date.now() - Number(pairCreatedAt)) / 60000;

    if (ageMinutes < 5) return 25;
    if (ageMinutes < 30) return 45;
    if (ageMinutes < 180) return 65;
    if (ageMinutes < 1440) return 78;
    if (ageMinutes < 10080) return 88;
    return 92;
};

const scoreTransactions = (txns) => {
    const buys = Number(txns?.h24?.buys || 0);
    const sells = Number(txns?.h24?.sells || 0);
    const total = buys + sells;

    if (total === 0) return 40;

    const buyRatio = buys / total;

    if (buyRatio >= 0.68) return 90;
    if (buyRatio >= 0.58) return 75;
    if (buyRatio >= 0.5) return 60;
    if (buyRatio >= 0.42) return 42;
    return 22;
};

const scoreMetadata = (info) => {
    let score = 35;

    const websites = Array.isArray(info?.websites) ? info.websites : [];
    const socials = Array.isArray(info?.socials) ? info.socials : [];

    if (websites.length > 0) score += 20;
    if (socials.length > 0) score += 20;
    if (socials.length >= 2) score += 10;
    if (info?.imageUrl) score += 10;

    return clamp(score);
};

const getAgeLabel = (pairCreatedAt) => {
    if (!pairCreatedAt) return "Unknown";

    const ageMinutes = Math.max(
        0,
        Math.floor((Date.now() - Number(pairCreatedAt)) / 60000)
    );

    if (ageMinutes < 60) return `${ageMinutes} min`;
    if (ageMinutes < 1440) return `${Math.floor(ageMinutes / 60)} hr`;
    return `${Math.floor(ageMinutes / 1440)} days`;
};

const getSocialPresence = (info) => {
    const websites = Array.isArray(info?.websites) ? info.websites : [];
    const socials = Array.isArray(info?.socials) ? info.socials : [];

    return {
        hasWebsite: websites.length > 0,
        websiteCount: websites.length,
        socialCount: socials.length,
        websites: websites.map((site) => ({
            label: site?.label || "Website",
            url: site?.url || null,
        })),
        socials: socials.map((social) => ({
            type: social?.type || "social",
            url: social?.url || null,
        })),
        imageUrl: info?.imageUrl || null,
    };
};

const buildRiskFlags = ({
    liquidity,
    marketCap,
    volume24h,
    priceChange24h,
    pairCreatedAt,
    txns,
    info,
}) => {
    const flags = [];

    const liqToMc = marketCap > 0 ? liquidity / marketCap : 0;
    const volumeToLiquidity = liquidity > 0 ? volume24h / liquidity : 0;
    const buys = Number(txns?.h24?.buys || 0);
    const sells = Number(txns?.h24?.sells || 0);
    const websites = Array.isArray(info?.websites) ? info.websites : [];
    const socials = Array.isArray(info?.socials) ? info.socials : [];

    if (liquidity < 10000) flags.push("low_liquidity");
    if (marketCap > 0 && liqToMc < 0.01) {
        flags.push("weak_liquidity_to_market_cap");
    }
    if (volume24h < 10000) flags.push("low_volume");
    if (volumeToLiquidity > 6) flags.push("possible_volume_spike");
    if (priceChange24h < -25) flags.push("heavy_negative_momentum");
    if (priceChange24h > 150 && liquidity < 50000) {
        flags.push("thin_liquidity_large_pump");
    }
    if (pairCreatedAt && Date.now() - Number(pairCreatedAt) < 10 * 60000) {
        flags.push("extremely_new_pair");
    }
    if (sells > buys && buys + sells > 20) flags.push("sell_pressure_dominant");
    if (websites.length === 0) flags.push("no_website_detected");
    if (socials.length === 0) flags.push("no_socials_detected");

    return flags;
};

const getVerdict = (score, flags) => {
    const dangerFlags = [
        "low_liquidity",
        "weak_liquidity_to_market_cap",
        "heavy_negative_momentum",
        "sell_pressure_dominant",
    ];

    const hasDangerFlag = flags.some((flag) => dangerFlags.includes(flag));

    if (score >= 78 && !hasDangerFlag) {
        return {
            verdict: "SAFE",
            signal: "SIGNAL CONFIRMED",
            risk: "LOW / CONTROLLED",
            action: "Observe structure. Confirmation favored.",
        };
    }

    if (score >= 45) {
        return {
            verdict: "CAUTION",
            signal: "SIGNAL DEVELOPING",
            risk: "MEDIUM",
            action: "Do not chase. Wait for confirmation.",
        };
    }

    return {
        verdict: "DANGER",
        signal: "WEAK SIGNAL",
        risk: "HIGH",
        action: "Avoid or observe only.",
    };
};

const getSourceHealth = (pairUrl, info) => {
    const socials = Array.isArray(info?.socials) ? info.socials : [];
    const websites = Array.isArray(info?.websites) ? info.websites : [];

    if (pairUrl && websites.length > 0 && socials.length > 0) {
        return "verified_presence";
    }

    if (pairUrl && (websites.length > 0 || socials.length > 0)) {
        return "partial_presence";
    }

    return "limited_presence";
};

export async function POST(req) {
    try {
        const { contract } = await req.json();

        if (!contract || typeof contract !== "string") {
            return NextResponse.json(
                { success: false, error: "No contract address provided." },
                { status: 400 }
            );
        }

        const tokenAddress = contract.trim();

        if (!BASE58_SOLANA_REGEX.test(tokenAddress)) {
            return NextResponse.json(
                { success: false, error: "Invalid Solana contract address format." },
                { status: 400 }
            );
        }

        const url = `https://api.dexscreener.com/token-pairs/v1/solana/${tokenAddress}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            return NextResponse.json(
                { success: false, error: "DexScreener lookup failed." },
                { status: response.status }
            );
        }

        const pairs = await response.json();

        if (!Array.isArray(pairs) || pairs.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "No live Solana pairs found for this contract.",
                },
                { status: 404 }
            );
        }

        const bestPair = pairs
            .filter((pair) => pair.chainId === "solana")
            .sort((a, b) => {
                const liqA = Number(a?.liquidity?.usd || 0);
                const liqB = Number(b?.liquidity?.usd || 0);
                return liqB - liqA;
            })[0];

        if (!bestPair) {
            return NextResponse.json(
                { success: false, error: "No valid Solana pair found." },
                { status: 404 }
            );
        }

        const liquidity = Number(bestPair?.liquidity?.usd || 0);
        const volume24h = Number(bestPair?.volume?.h24 || 0);
        const marketCap = Number(bestPair?.marketCap || bestPair?.fdv || 0);
        const priceChange24h = Number(bestPair?.priceChange?.h24 || 0);
        const pairCreatedAt = bestPair?.pairCreatedAt || null;
        const txns = bestPair?.txns || {};
        const info = bestPair?.info || {};
        const socialPresence = getSocialPresence(info);

        const breakdown = {
            liquidity: scoreLiquidity(liquidity),
            volume: scoreVolume(volume24h, liquidity),
            liquidityBalance: scoreLiquidityBalance(liquidity, marketCap),
            momentum: scoreMomentum(priceChange24h, volume24h, liquidity),
            age: scoreAge(pairCreatedAt),
            transactions: scoreTransactions(txns),
            metadata: scoreMetadata(info),
        };

        const finalScore = clamp(
            breakdown.liquidity * 0.2 +
            breakdown.volume * 0.16 +
            breakdown.liquidityBalance * 0.18 +
            breakdown.momentum * 0.15 +
            breakdown.age * 0.1 +
            breakdown.transactions * 0.11 +
            breakdown.metadata * 0.1
        );

        const riskFlags = buildRiskFlags({
            liquidity,
            marketCap,
            volume24h,
            priceChange24h,
            pairCreatedAt,
            txns,
            info,
        });

        const verdictData = getVerdict(finalScore, riskFlags);

        return NextResponse.json({
            success: true,
            result: {
                name: bestPair?.baseToken?.name || "Unknown Token",
                symbol: bestPair?.baseToken?.symbol || "UNKNOWN",
                address: tokenAddress,
                pairAddress: bestPair?.pairAddress || null,
                quoteToken: bestPair?.quoteToken?.symbol || null,
                dex: bestPair?.dexId || "unknown",
                pairUrl: bestPair?.url || null,
                priceUsd: bestPair?.priceUsd || null,
                liquidity,
                volume24h,
                marketCap,
                fdv: Number(bestPair?.fdv || 0),
                priceChange24h,
                pairAge: getAgeLabel(pairCreatedAt),
                pairCreatedAt,
                buys24h: Number(txns?.h24?.buys || 0),
                sells24h: Number(txns?.h24?.sells || 0),
                score: finalScore,
                verdict: verdictData.verdict,
                signal: verdictData.signal,
                risk: verdictData.risk,
                action: verdictData.action,
                riskFlags,
                breakdown,
                sourceHealth: getSourceHealth(bestPair?.url, info),
                socialPresence,
            },
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: "Signal check failed. Try again.",
            },
            { status: 500 }
        );
    }
}
