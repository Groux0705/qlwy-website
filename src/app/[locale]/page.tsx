'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import Bagua3D from '@/components/iching/Bagua3D';
import type { Locale } from '@/i18n';

interface HomePageProps {
  params: { locale: Locale };
}

export default function HomePage({ params: { locale } }: HomePageProps) {
  const t = useTranslations('hero');

  const stats = [
    { label: t('stats.nftMinted'), value: '12,847' },
    { label: t('stats.jackpot'), value: '2.4M QLWY' },
    { label: t('stats.battles'), value: '8,392' },
  ];

  return (
    <div className="min-h-screen bg-xuan-black">
      <Navigation locale={locale} />

      {/* 3D Background */}
      <Bagua3D />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-xuan-black/50 via-transparent to-xuan-black" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Subtitle Animation */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-amber/80 text-lg mb-4 tracking-widest"
          >
            潜龙勿用
          </motion.p>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6"
          >
            <span className="text-gradient-gold">{t('title')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xuan-paper/70 text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-chi-gold to-amber text-xuan-black font-semibold rounded-lg glow-gold transition-all"
            >
              {t('cta')}
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <p className="text-2xl md:text-3xl font-serif text-chi-gold">{stat.value}</p>
                <p className="text-xs md:text-sm text-xuan-paper/60 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-chi-gold/50 rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-chi-gold rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-xuan-black to-ink">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-serif text-center text-gradient-gold mb-16"
          >
            系统概览
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: '卜卦系统', desc: '以古老占卜之术寻求神谕', icon: '☰' },
              { title: 'PVP战斗', desc: '3v3团队NFT对战', icon: '⚔' },
              { title: '预测市场', desc: '预测真实世界事件', icon: '◎' },
              { title: '精炼系统', desc: '提升NFT稀有度', icon: '◈' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-ink/50 border border-ink-light rounded-lg p-6 hover:border-chi-gold/50 transition-all"
              >
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="text-xl font-serif text-chi-gold mb-2">{feature.title}</h3>
                <p className="text-xuan-paper/60 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer locale={locale} />
    </div>
  );
}
