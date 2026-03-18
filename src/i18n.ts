import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'zh', 'zh-TW', 'ko', 'ja'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '简体中文',
  'zh-TW': '繁體中文',
  ko: '한국어',
  ja: '日本語',
};

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../messages/${locale}.json`)).default,
}));
