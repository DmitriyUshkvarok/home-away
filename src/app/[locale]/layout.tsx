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
  metadataBase: new URL('https://home-away-snowy.vercel.app'),
  title: {
    default: 'Home Away | Your Ultimate Vacation Rental App',
    template: `%s | Home Away | Your Ultimate Vacation Rental App`,
  },
  description:
    'Home Away is your go-to platform for booking vacation rentals around the world. Whether you’re looking for a cozy getaway or a luxurious retreat, Home Away offers a wide selection of properties to suit your needs. Explore and book your perfect vacation rental, from beachfront cottages to city apartments, all with the convenience of a seamless online booking experience. Find your dream destination, relax, and create lasting memories with Home Away.',
  generator: 'Next.js',
  applicationName: 'Home Away App Dmitriy Ushkvarok',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Vacation Rentals',
    'Travel',
    'Accommodation',
    'Holiday Homes',
    'Airbnb Alternatives',
    'Travel App',
    'Booking Platform',
    'Next.js',
    'React',
    'Dmitriy Ushkvarok',
  ],
  authors: [
    {
      name: 'Dmitriy Ushkvarok',
      url: 'https://www.linkedin.com/in/dmitriy-ushkvarok/',
    },
  ],
  creator: 'Dmitriy Ushkvarok',
  publisher: 'Dmitriy Ushkvarok',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    images: [
      {
        url: '/openGraph.jpg',
        width: 400,
        height: 300,
      },
    ],
    type: 'website',
    siteName: 'Dmitriy Ushkvarok Home Away Vacation Rentals',
  },
  verification: {
    google: 'AOjUnX-0ZVriCXmOY7_0Qkj2Me_F9HO3-IoLSjmde44',
  },
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
