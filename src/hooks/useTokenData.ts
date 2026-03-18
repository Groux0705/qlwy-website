import useSWR from 'swr';
import { getTokenPrice, type TokenPrice } from '@/lib/dexscreener';

// BSC链上QLWY代币地址（需要替换为实际地址）
const QLWY_TOKEN_ADDRESS = '0xYourQLWYTokenAddressHere';

const fetcher = async (address: string): Promise<TokenPrice | null> => {
  return getTokenPrice(address);
};

export function useTokenData() {
  const { data, error, isLoading, mutate } = useSWR(
    QLWY_TOKEN_ADDRESS,
    fetcher,
    {
      refreshInterval: 30000, // 每30秒刷新一次
      revalidateOnFocus: true,
      dedupingInterval: 10000,
    }
  );

  return {
    data,
    isLoading,
    isError: !!error,
    refresh: mutate,
  };
}

export function useTokenPrice(symbol: string) {
  const { data, error, isLoading } = useSWR(
    `token-${symbol}`,
    async () => {
      // 使用symbol搜索代币
      const tokens = await fetch(`https://api.dexscreener.com/tokens/${symbol}`).then(r => r.json());
      return tokens;
    },
    {
      refreshInterval: 60000, // 每分钟刷新
    }
  );

  return {
    data,
    isLoading,
    isError: !!error,
  };
}
