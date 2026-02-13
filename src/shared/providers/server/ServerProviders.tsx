import { FC, ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';

export const ServerProviders: FC<{ locale: string; children: ReactNode }> = ({
  locale,
  children,
}) => {
  return <NextIntlClientProvider locale={locale}> {children} </NextIntlClientProvider>;
};
