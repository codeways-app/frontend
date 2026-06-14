import { ReactNode } from 'react';

import { Suspense } from 'react';

import { AuthSocketProvider } from '@/shared/providers/client';

import { TopLoader } from '@/features/TopLoader';

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense>
        <TopLoader />
      </Suspense>
      <AuthSocketProvider>{children}</AuthSocketProvider>
    </>
  );
}
