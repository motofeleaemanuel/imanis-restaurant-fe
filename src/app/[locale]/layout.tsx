import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Libre_Baskerville, Montserrat } from 'next/font/google';
import '../globals.css'
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SplashScreen from '@/components/SplashScreen';
import { Analytics } from '@vercel/analytics/next';

const libreBaskerville = Libre_Baskerville({
  variable: '--font-libre-baskerville',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Imanis Cafeteria',
  description: 'A cozy spot serving artisanal coffee, fresh pastries, and homemade treats.',
  icons: {
    icon: '/favicon.jpg',
    shortcut: '/favicon.jpg',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={` ${montserrat.variable} ${geistSans.variable} ${geistMono.variable} ${libreBaskerville.variable} antialiased`}>
        <SplashScreen />
        <NextIntlClientProvider>
          <div className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-xl">
            <Navigation />
          </div>
          {children}
          <Footer />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
