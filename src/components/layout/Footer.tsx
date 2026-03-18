'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Twitter, MessageCircle, Send, Github } from 'lucide-react';

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/qlwy', label: t('links.twitter') },
    { icon: MessageCircle, href: 'https://discord.gg/qlwy', label: t('links.discord') },
    { icon: Send, href: 'https://t.me/qlwy', label: t('links.telegram') },
    { icon: Github, href: 'https://github.com/qlwy', label: t('links.github') },
  ];

  return (
    <footer className="bg-ink border-t border-ink-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-12 h-12 rounded-full border-2 border-chi-gold flex items-center justify-center">
                <span className="text-chi-gold font-serif text-xl">龍</span>
              </div>
              <div>
                <span className="text-chi-gold font-serif text-2xl">潜龙勿用</span>
                <p className="text-xuan-paper/60 text-sm">Fortune Favors the Hidden Dragon</p>
              </div>
            </motion.div>
            <p className="text-xuan-paper/60 text-sm max-w-md">
              基于易经智慧的Web3 NFT生态系统。融合传统与现代科技，
              在BNB链上创造独特的游戏化体验。
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-chi-gold font-serif mb-4">导航</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/docs`} className="text-xuan-paper/60 hover:text-chi-gold transition-colors">
                  文档
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/marketplace`} className="text-xuan-paper/60 hover:text-chi-gold transition-colors">
                  市场
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/dashboard`} className="text-xuan-paper/60 hover:text-chi-gold transition-colors">
                  数据面板
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-chi-gold font-serif mb-4">社区</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full border border-chi-gold/30 flex items-center justify-center text-xuan-paper/60 hover:text-chi-gold hover:border-chi-gold transition-colors"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-ink-light text-center">
          <p className="text-xuan-paper/40 text-sm">
            © {new Date().getFullYear()} 潜龙勿用. {t('rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Need to import Link
import Link from 'next/link';
