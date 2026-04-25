import { NextResponse } from "next/server";

const formatToken = (pair) => {
    return {
        name: pair?.baseToken?.name || "Unknown",
        symbol: pair?.baseToken?.symbol || "UNKNOWN",
        address: pair?.baseToken?.address || null,
        dex: pair?.dexId || "unknown",
        pairUrl: pair?.url || null,
        priceUsd: Number(pair?.priceUsd || 0),
        liquidity: Number(pair?.liquidity?.usd || 0),
        volume24h: Number(pair?.volume?.h24 || 0),
        marketCap: Number(pair?.marketCap || pair?.fdv || 0),
        priceChange24h: Number(pair?.priceChange?.h24 || 0),
    };
};

export async function GET() {
    try {
        const response = await fetch("https://api.dexscreener.com/token-profiles/latest/v1", {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            return NextResponse.json(
                { success: false, error: "Unable to fetch trending profiles." },
                { status: response.status }
            );
        }

        const profiles = await response.json();

        if (!Array.isArray(profiles)) {
            return NextResponse.json(
                { success: false, error: "Invalid Dex response." },
                { status: 500 }
            );
        }

        const solanaProfiles = profiles
            .filter((p) => p.chainId === "solana")
            .slice(0, 12);

        const enrichedPairs = [];

        for (const profile of solanaProfiles) {
            try {
                const pairRes = await fetch(
                    `https://api.dexscreener.com/token-pairs/v1/solana/${profile.tokenAddress}`,
                    {
                        headers: { Accept: "application/json" },
                        cache: "no-store",
                    }
                );

                const pairData = await pairRes.json();

                if (Array.isArray(pairData) && pairData.length > 0) {
                    const bestPair = pairData.sort(
                        (a, b) =>
                            Number(b?.liquidity?.usd || 0) - Number(a?.liquidity?.usd || 0)
                    )[0];

                    enrichedPairs.push(formatToken(bestPair));
                }
            } catch (err) {
                continue;
            }
        }

        const topLiquidity = [...enrichedPairs]
            .sort((a, b) => b.liquidity - a.liquidity)
            .slice(0, 6);

        const topVolume = [...enrichedPairs]
            .sort((a, b) => b.volume24h - a.volume24h)
            .slice(0, 6);

        const topMomentum = [...enrichedPairs]
            .sort((a, b) => b.priceChange24h - a.priceChange24h)
            .slice(0, 6);

        return NextResponse.json({
            success: true,
            result: {
                topLiquidity,
                topVolume,
                topMomentum,
            },
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Trending route failed." },
            { status: 500 }
        );
    }
}