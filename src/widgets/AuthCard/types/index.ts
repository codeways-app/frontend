import { ReactNode } from 'react';

type FadeType = boolean | number;

export interface AuthLayoutProps {
  title: string;
  oauth?: boolean;
  fade?: FadeType;
  children: ReactNode;
}

export type ProviderTypes = 'google' | 'yandex';
