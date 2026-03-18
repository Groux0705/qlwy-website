'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { Book, Sword, Coins, FlaskConical, TrendingUp, FileText } from 'lucide-react';
import type { Locale } from '@/i18n';

interface DocsPageProps {
  params: { locale: Locale };
}

const docSections = [
  {
    icon: Book,
    title: '卜卦系统',
    desc: '了解铸造NFT的占卜流程、费用分配和随机数生成机制',
    href: '/docs/casting',
    color: 'chi-gold',
  },
  {
    icon: Sword,
    title: 'PVP战斗',
    desc: '3v3团队对战规则、评分系统和NFT烧毁机制',
    href: '/docs/battle',
    color: 'cinnabar',
  },
  {
    icon: Coins,
    title: '代币系统',
    desc: 'QLWY代币经济学、质押奖励和燃烧机制',
    href: '/docs/token',
    color: 'amber',
  },
  {
    icon: FlaskConical,
    title: '精炼系统',
    desc: 'NFT稀有度升级、成功率和ASH代币机制',
    href: '/docs/refinery',
    color: 'jade',
  },
  {
    icon: TrendingUp,
    title: '预测市场',
    desc: 'LMSR AMM机制、预测结果和争议解决',
    href: '/docs/prediction',
    color: 'purple',
  },
  {
    icon: FileText,
    title: '完整白皮书',
    desc: '查看项目完整技术文档和规范',
    href: '/docs/whitepaper',
    color: 'ink',
  },
];

export default function DocsPage({ params: { locale } }: DocsPageProps) {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-xuan-black">
      <Navigation locale={locale} />

      <main className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl font-serif text-gradient-gold mb-4">文档中心</h1>
            <p className="text-xuan-paper/60 max-w-2xl mx-auto">
              深入了解潜龙勿用的各个系统模块，包括卜卦机制、战斗系统、代币经济等核心功能
            </p>
          </motion.div>

          {/* Doc Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {docSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/${locale}${section.href}`}
                  className="block bg-ink/50 border border-ink-light rounded-lg p-6 hover:border-chi-gold/50 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-${section.color}/10 flex items-center justify-center flex-shrink-0`}>
                      <section.icon className={`w-6 h-6 text-${section.color}`} />
                    </div>
                    <div>
                      <h2 className="text-xl font-serif text-chi-gold mb-2 group-hover:translate-x-1 transition-transform">
                        {section.title}
                      </h2>
                      <p className="text-xuan-paper/60 text-sm">
                        {section.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Additional Resources */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 p-6 bg-ink/30 border border-ink-light rounded-lg"
          >
            <h3 className="text-lg font-serif text-chi-gold mb-4">其他资源</h3>
            <ul className="space-y-2 text-xuan-paper/60">
              <li>
                <a href="https://github.com/qlwy" className="hover:text-chi-gold transition-colors">
                  GitHub 源代码
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-chi-gold transition-colors">
                  合约审计报告
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-chi-gold transition-colors">
                  API 文档
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
