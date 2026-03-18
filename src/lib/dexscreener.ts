/**
 * DexScreener API Integration
 * 获取QLWY代币的实时价格和交易数据
 */

const DEXSCREENER_API = 'https://api.dexscreener.com';

export interface TokenPrice {
  tokenAddress: string;
  symbol: string;
  name: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  marketCap: number;
  pairs: Pair[];
}

export interface Pair {
  chainId: string;
  dexId: string;
  pairAddress: string;
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  quoteToken: {
    address: string;
    name: string;
    symbol: string;
  };
  price: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: {
    usd: number;
    base: number;
    quote: number;
  };
  txCount: number;
  url: string;
}

/**
 * 通过代币symbol搜索代币对
 */
export async function searchTokens(query: string): Promise<TokenPrice[]> {
  try {
    const response = await fetch(`${DEXSCREENER_API}/tokens/${query}`);
    if (!response.ok) {
      throw new Error('Failed to fetch tokens');
    }
    const data = await response.json();
    return data.pairs || [];
  } catch (error) {
    console.error('Error searching tokens:', error);
    return [];
  }
}

/**
 * 获取特定代币地址的最新价格数据
 */
export async function getTokenPrice(tokenAddress: string): Promise<TokenPrice | null> {
  try {
    const response = await fetch(`${DEXSCREENER_API}/tokens/${tokenAddress}`);
    if (!response.ok) {
      throw new Error('Failed to fetch token price');
    }
    const data = await response.json();

    if (!data.pairs || data.pairs.length === 0) {
      return null;
    }

    // 按流动性排序，返回最佳交易对
    const sortedPairs = data.pairs.sort((a: Pair, b: Pair) =>
      (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0)
    );

    const topPair = sortedPairs[0];

    return {
      tokenAddress,
      symbol: topPair.baseToken.symbol,
      name: topPair.baseToken.name,
      price: topPair.price,
      priceChange24h: topPair.priceChange24h,
      volume24h: topPair.volume24h,
      liquidity: topPair.liquidity?.usd || 0,
      marketCap: 0, // DexScreener不直接提供market cap
      pairs: sortedPairs.slice(0, 5),
    };
  } catch (error) {
    console.error('Error getting token price:', error);
    return null;
  }
}

/**
 * 获取BSC链上特定DEX的交易对
 */
export async function getBSCPairs(dexId: string = 'pancakeswap'): Promise<Pair[]> {
  try {
    const response = await fetch(`${DEXSCREENER_API}/pairs/bsc/${dexId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch pairs');
    }
    const data = await response.json();
    return data.pairs || [];
  } catch (error) {
    console.error('Error getting BSC pairs:', error);
    return [];
  }
}

/**
 * 获取交易对历史数据（用于图表）
 * 注意: DexScreener免费API不提供历史数据，这里返回模拟数据
 */
export async function getPairHistory(pairAddress: string): Promise<number[]> {
  // 模拟24小时价格数据（每小时一个点）
  const now = Date.now();
  const basePrice = 0.001; // 假设基础价格
  const history: number[] = [];

  for (let i = 24; i >= 0; i--) {
    const timestamp = now - i * 60 * 60 * 1000;
    const randomFactor = 1 + (Math.random() - 0.5) * 0.1;
    const price = basePrice * randomFactor;
    history.push(price);
  }

  return history;
}
