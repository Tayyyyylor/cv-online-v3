"use client";

import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  messages: Record<string, unknown>;
  locale: string;
};

export function Providers({ children, messages, locale }: Props) {

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      // Changer de langue remonte ce composant : côté client, le script ne doit plus s'exécuter.
      scriptProps={typeof window === 'undefined' ? undefined : { type: 'application/json' }}
    >
      <NextIntlClientProvider messages={messages} locale={locale} timeZone={timeZone}>
        {children}
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
