'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { locales, localeNames, type Locale } from '@/i18n';

interface NavigationProps {
  locale: Locale;
}

export function Navigation({ locale }: NavigationProps) {
  const t = useTranslations('common');
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const navItems = [
    { href: `/${locale}/`, label: t('explore') },
    { href: `/${locale}/docs`, label: t('docs') },
    { href: `/${locale}/marketplace`, label: t('marketplace') },
    { href: `/${locale}/dashboard`, label: t('dashboard') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-xuan-black/80 backdrop-blur-md border-b border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-full border-2 border-chi-gold flex items-center justify-center"
            >
              <span className="text-chi-gold font-serif text-lg">龍</span>
            </motion.div>
            <div>
              <span className="text-chi-gold font-serif text-xl">{t('brand')}</span>
              <span className="text-xuan-paper/60 text-xs block">{t('fullName')}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xuan-paper/80 hover:text-chi-gold transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-chi-gold transition-all group-hover:w-full" />
              </Link>
            ))}

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 text-xuan-paper/80 hover:text-chi-gold transition-colors"
              >
                <Globe size={18} />
                <span className="text-sm">{localeNames[locale]}</span>
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-40 bg-ink border border-ink-light rounded-lg shadow-lg overflow-hidden"
                  >
                    {locales.map((loc) => (
                      <Link
                        key={loc}
                        href={`/${loc}`}
                        onClick={() => setIsLangOpen(false)}
                        className={`block px-4 py-2 text-sm hover:bg-ink-light transition-colors ${
                          loc === locale ? 'text-chi-gold' : 'text-xuan-paper/80'
                        }`}
                      >
                        {localeNames[loc]}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-xuan-paper"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-ink border-t border-ink-light"
          >
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-xuan-paper/80 hover:text-chi-gold transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-ink-light">
                <p className="text-xuan-paper/60 text-sm mb-2">{t('language')}</p>
                <div className="flex flex-wrap gap-2">
                  {locales.map((loc) => (
                    <Link
                      key={loc}
                      href={`/${loc}`}
                      onClick={() => setIsOpen(false)}
                      className={`text-sm px-2 py-1 rounded ${
                        loc === locale
                          ? 'bg-chi-gold/20 text-chi-gold'
                          : 'text-xuan-paper/60 hover:text-chi-gold'
                      }`}
                    >
                      {localeNames[loc]}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
