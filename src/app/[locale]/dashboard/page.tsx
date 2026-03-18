'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { useTokenData } from '@/hooks/useTokenData';
import { formatUSD, formatNumber, formatPercent } from '@/lib/utils';
import { TrendingUp, TrendingDown, Activity, Droplets, Users, Swords } from 'lucide-react';
import type { Locale } from '@/i18n';

interface DashboardPageProps {
  params: { locale: Locale };
}

function StatCard({ icon: Icon, label, value, change, isPositive }: {
  icon: any;
  label: string;
  value: string;
  change?: number;
  isPositive?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-ink/50 border border-ink-light rounded-lg p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-full bg-chi-gold/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-chi-gold" />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span className="text-sm font-medium">{formatPercent(change)}</span>
          </div>
        )}
      </div>
      <p className="text-xuan-paper/60 text-sm mb-1">{label}</p>
      <p className="text-2xl font-serif text-chi-gold">{value}</p>
    </motion.div>
  );
}

export default function DashboardPage({ params: { locale } }: DashboardPageProps) {
  const t = useTranslations('dashboard');
  const { data: tokenData, isLoading, error } = useTokenData();

  return (
    <div className="min-h-screen bg-xuan-black">
      <Navigation locale={locale} />

      <main className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-serif text-gradient-gold mb-2">{t('title')}</h1>
            <p className="text-xuan-paper/60">实时数据与市场概览</p>
          </motion.div>

          {/* Price & Market Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={Activity}
              label={t('price')}
              value={tokenData ? formatUSD(tokenData.price) : '加载中...'}
              change={tokenData?.priceChange24h}
              isPositive={tokenData ? tokenData.priceChange24h >= 0 : true}
            />
            <StatCard
              icon={Droplets}
              label={t('tvl')}
              value={tokenData ? formatUSD(tokenData.liquidity) : '加载中...'}
            />
            <StatCard
              icon={Users}
              label="活跃用户"
              value="1,234"
              change={12.5}
              isPositive={true}
            />
            <StatCard
              icon={Swords}
              label={t('jackpot')}
              value="2.4M QLWY"
            />
          </div>

          {/* Chart Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-ink/50 border border-ink-light rounded-lg p-6 mb-8"
          >
            <h2 className="text-xl font-serif text-chi-gold mb-4">QLWY 价格走势</h2>
            <div className="h-64 flex items-center justify-center text-xuan-paper/40">
              {isLoading ? (
                <p>加载中...</p>
              ) : error ? (
                <p>暂时无法获取数据</p>
              ) : (
                <div className="w-full h-full flex items-end justify-around gap-1">
                  {[0.8, 0.6, 0.7, 0.5, 0.9, 0.4, 0.7, 0.6, 0.8, 0.5, 0.7, 0.9].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h * 100}%` }}
                      transition={{ delay: i * 0.05 }}
                      className="w-6 bg-gradient-to-t from-chi-gold to-amber rounded-t"
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Recent Battles & Top Holders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Battles */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-ink/50 border border-ink-light rounded-lg p-6"
            >
              <h2 className="text-xl font-serif text-chi-gold mb-4">{t('recentBattles')}</h2>
              <div className="space-y-4">
                {[
                  { p1: '0x1234...', p2: '0x5678...', result: '胜' },
                  { p1: '0x9abc...', p2: '0xdef0...', result: '负' },
                  { p1: '0x1111...', p2: '0x2222...', result: '胜' },
                ].map((battle, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-ink-light last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xuan-paper/80 font-mono text-sm">{battle.p1}</span>
                      <span className="text-xuan-paper/40">vs</span>
                      <span className="text-xuan-paper/80 font-mono text-sm">{battle.p2}</span>
                    </div>
                    <span className={`text-sm ${battle.result === '胜' ? 'text-green-400' : 'text-red-400'}`}>
                      {battle.result}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Top Holders */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-ink/50 border border-ink-light rounded-lg p-6"
            >
              <h2 className="text-xl font-serif text-chi-gold mb-4">{t('topHolders')}</h2>
              <div className="space-y-4">
                {[
                  { rank: 1, address: '0xAAAA...BBBB', amount: '1.2M QLWY' },
                  { rank: 2, address: '0xCCCC...DDDD', amount: '800K QLWY' },
                  { rank: 3, address: '0xEEEE...FFFF', amount: '500K QLWY' },
                ].map((holder) => (
                  <div key={holder.rank} className="flex items-center justify-between py-2 border-b border-ink-light last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-chi-gold/20 text-chi-gold text-sm flex items-center justify-center">
                        {holder.rank}
                      </span>
                      <span className="text-xuan-paper/80 font-mono text-sm">{holder.address}</span>
                    </div>
                    <span className="text-chi-gold text-sm">{holder.amount}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
