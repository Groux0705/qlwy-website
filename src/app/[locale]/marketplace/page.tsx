'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { useState } from 'react';
import { Filter, Grid, List, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Locale } from '@/i18n';

interface MarketplacePageProps {
  params: { locale: Locale };
}

const rarityColors = {
  common: 'border-xuan-paper/30 text-xuan-paper/70',
  rare: 'border-blue-400/30 text-blue-400',
  epic: 'border-purple-400/30 text-purple-400',
  legendary: 'border-orange-400/30 text-orange-400',
  mythic: 'border-chi-gold/50 text-chi-gold glow-gold',
};

const mockNFTs = [
  { id: 1, name: 'NFT #1234', rarity: 'mythic', price: '2.5 ETH', luck: 87 },
  { id: 2, name: 'NFT #5678', rarity: 'legendary', price: '0.8 ETH', luck: 72 },
  { id: 3, name: 'NFT #9012', rarity: 'epic', price: '0.3 ETH', luck: 65 },
  { id: 4, name: 'NFT #3456', rarity: 'rare', price: '0.1 ETH', luck: 45 },
  { id: 5, name: 'NFT #7890', rarity: 'common', price: '0.02 ETH', luck: 23 },
  { id: 6, name: 'NFT #1111', rarity: 'mythic', price: '3.2 ETH', luck: 95 },
];

export default function MarketplacePage({ params: { locale } }: MarketplacePageProps) {
  const t = useTranslations('marketplace');
  const [filter, setFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const rarities = ['all', 'common', 'rare', 'epic', 'legendary', 'mythic'];

  const filteredNFTs = filter === 'all'
    ? mockNFTs
    : mockNFTs.filter(nft => nft.rarity === filter);

  return (
    <div className="min-h-screen bg-xuan-black">
      <Navigation locale={locale} />

      <main className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-serif text-gradient-gold mb-2">{t('title')}</h1>
            <p className="text-xuan-paper/60">交易和铸造 QLWY NFT</p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-4 mb-8 p-4 bg-ink/50 border border-ink-light rounded-lg"
          >
            <div className="flex-1 min-w-[150px]">
              <p className="text-xuan-paper/60 text-sm">{t('floorPrice')}</p>
              <p className="text-xl font-serif text-chi-gold">0.02 ETH</p>
            </div>
            <div className="flex-1 min-w-[150px]">
              <p className="text-xuan-paper/60 text-sm">{t('volume24h')}</p>
              <p className="text-xl font-serif text-chi-gold">124.5 ETH</p>
            </div>
            <div className="flex-1 min-w-[150px]">
              <p className="text-xuan-paper/60 text-sm">{t('minted')}</p>
              <p className="text-xl font-serif text-chi-gold">12,847</p>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-between gap-4 mb-8"
          >
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-xuan-paper/40" />
              <input
                type="text"
                placeholder="搜索 NFT..."
                className="w-full pl-10 pr-4 py-2 bg-ink border border-ink-light rounded-lg text-xuan-paper placeholder:text-xuan-paper/40 focus:outline-none focus:border-chi-gold/50"
              />
            </div>

            {/* Rarity Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-xuan-paper/60" />
              <div className="flex flex-wrap gap-2">
                {rarities.map((rarity) => (
                  <button
                    key={rarity}
                    onClick={() => setFilter(rarity)}
                    className={cn(
                      'px-3 py-1 rounded-full text-sm transition-all',
                      filter === rarity
                        ? 'bg-chi-gold text-xuan-black'
                        : 'bg-ink border border-ink-light text-xuan-paper/60 hover:border-chi-gold/50'
                    )}
                  >
                    {rarity === 'all' ? '全部' : t(`rarity.${rarity}` as any)}
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-2 rounded transition-colors',
                  viewMode === 'grid' ? 'bg-chi-gold text-xuan-black' : 'bg-ink text-xuan-paper/60'
                )}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-2 rounded transition-colors',
                  viewMode === 'list' ? 'bg-chi-gold text-xuan-black' : 'bg-ink text-xuan-paper/60'
                )}
              >
                <List size={20} />
              </button>
            </div>
          </motion.div>

          {/* NFT Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={cn(
              'grid gap-6',
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            )}
          >
            {filteredNFTs.map((nft, index) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className={cn(
                  'bg-ink/50 border rounded-lg p-4 transition-all cursor-pointer',
                  rarityColors[nft.rarity as keyof typeof rarityColors]
                )}
              >
                {/* NFT Visual */}
                <div className="aspect-square bg-ink rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-ink-light to-transparent" />
                  <span className="text-6xl relative z-10">
                    {nft.rarity === 'mythic' ? '🐉' :
                     nft.rarity === 'legendary' ? '🌟' :
                     nft.rarity === 'epic' ? '⚡' :
                     nft.rarity === 'rare' ? '💎' : '🔮'}
                  </span>
                </div>

                {/* NFT Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg">{nft.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-chi-gold/20 text-chi-gold">
                      {t(`rarity.${nft.rarity}` as any)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xuan-paper/60">幸运值</span>
                    <span className="text-chi-gold">{nft.luck}</span>
                  </div>
                  <div className="pt-2 border-t border-ink-light">
                    <p className="text-xuan-paper/60 text-sm">价格</p>
                    <p className="text-xl font-serif text-amber">{nft.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
