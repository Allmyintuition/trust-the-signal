import { NextResponse } from "next/server";

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

        let signal = "OBSERVE";
        let risk = "CAUTION";

        if (liquidity >= 50000 && volume24h >= 100000 && priceChange24h > 0) {
            signal = "SIGNAL DETECTED";
            risk = "HEALTHY";
        } else if (liquidity < 10000 || volume24h < 10000) {
            signal = "WEAK SIGNAL";
            risk = "HIGH RISK";
        }

        return NextResponse.json({
            success: true,
            result: {
                name: bestPair?.baseToken?.name || "Unknown Token",
                symbol: bestPair?.baseToken?.symbol || "UNKNOWN",
                address: tokenAddress,
                dex: bestPair?.dexId || "unknown",
                pairUrl: bestPair?.url || null,
                priceUsd: bestPair?.priceUsd || null,
                liquidity,
                volume24h,
                marketCap,
                priceChange24h,
                signal,
                risk,
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