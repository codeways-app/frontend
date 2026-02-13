import { ReactNode } from 'react';

export interface AuthLayoutProps {
  title: string;
  oauth?: boolean;
  children: ReactNode;
}

export type ProviderTypes = 'google' | 'yandex';
