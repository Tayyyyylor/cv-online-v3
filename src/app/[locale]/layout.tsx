import { hasLocale } from 'next-intl';
import { Analytics } from "@vercel/analytics/next"
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Providers } from '@/components/Providers';
import { Fraunces, Inter, Geist_Mono } from 'next/font/google'
import type { Metadata } from 'next'
import { ogLocale, SITE_NAME, SITE_URL, SKILLS } from '@/lib/site'
import "../globals.css"

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: "variable",
  style: ["normal", "italic"],
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})
const geist = Geist_Mono({
  subsets: ['latin'],
  weight: "300",
  variable: '--font-geist',
})

// Le canonique et les hreflang sont posés par chaque page : définis ici, ils seraient hérités tels quels.
export async function generateMetadata({ params }: Pick<Props, 'params'>): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Book.meta' })
  const title = t('title')
  const description = t('description')

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: t('template') },
    description,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    keywords: SKILLS.slice(0, 12),
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title,
      description,
      locale: ogLocale(locale),
      alternateLocale: routing.locales.filter((item) => item !== locale).map(ogLocale),
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function LocaleLayout({ children, modal, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={`${fraunces.variable} ${inter.variable} ${geist.variable}`}>
      <body>
        <Providers messages={messages} locale={locale}>
          {children}
          {modal}
          <Analytics/>
        </Providers>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
