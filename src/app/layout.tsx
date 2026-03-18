import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: '潜龙勿用 | QLWY - Fortune Favors the Hidden Dragon',
  description: 'Experience the ancient wisdom of I Ching through blockchain technology. NFT, Gaming, and Prediction Market on BSC.',
  keywords: ['QLWY', '潜龙勿用', 'NFT', 'Blockchain', 'BSC', 'I Ching', '易经', 'Web3', 'GameFi'],
  authors: [{ name: 'QLWY Team' }],
  openGraph: {
    title: '潜龙勿用 | QLWY',
    description: 'Fortune Favors the Hidden Dragon - An NFT ecosystem inspired by I Ching',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
