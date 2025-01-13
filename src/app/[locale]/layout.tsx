import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import Providers from '@/providers/providers';
import { ClerkProvider } from '@clerk/nextjs';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Locale } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'HomeAway',
  description: 'Feel at home, away from home.',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  return (
    <ClerkProvider>
      <html lang={locale || 'en'} suppressHydrationWarning={true}>
        <body>
          <h1 className="hiddenTitle">Home Away Dmitriy Ushkvarok Home Page</h1>
          <NextIntlClientProvider messages={messages}>
            <Providers>
              <Navbar />
              <main className="container py-10">{children}</main>
            </Providers>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
