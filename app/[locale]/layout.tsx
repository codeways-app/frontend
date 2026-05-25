import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import type React from 'react';
import type { Metadata } from 'next';

import { ClientProviders } from '@/shared/providers/client';
import { ServerProviders } from '@/shared/providers/server';
import { routing } from '@/shared/configs/i18n';

import '@/shared/theme/index.css';

// WTF THIS CODE DUDE
export const metadata: Metadata = {
  title: {
    template: `%s | Codeways`, 
    default: 'Codeways',
  },
  description: 'Codeways platform',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <ServerProviders locale={locale}>
          <ClientProviders>{children}</ClientProviders>
        </ServerProviders>
      </body>
    </html>
  );
}
