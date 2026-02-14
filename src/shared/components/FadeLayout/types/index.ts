import { ReactNode } from 'react';

export type FadeLayoutProps = {
  children: ReactNode;
  blur?: boolean;
  duration?: number;
  easing?: string;
  initialOpacity?: number;
};
