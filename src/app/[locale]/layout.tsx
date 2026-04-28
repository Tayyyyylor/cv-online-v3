import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Providers } from '@/components/Providers';
import { Fraunces, Inter, Geist_Mono } from 'next/font/google'
import "../globals.css"

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: "300",
  style: ["normal", "italic"],
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
        </Providers>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
