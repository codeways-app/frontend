import { ReactNode } from 'react';

import { AuthSocketProvider } from '@/shared/providers/client';

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return <AuthSocketProvider>{children}</AuthSocketProvider>;
}
