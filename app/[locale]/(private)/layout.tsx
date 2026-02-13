'use client';

import { ReactNode, useEffect } from 'react';

import { useAuthUser } from '@/shared/stores/app/hooks';
import { connectSocket, disconnectSocket } from '@/shared/configs/webSockets/lib';

export default function PrivateLayout({ children }: { children: ReactNode }) {
  const user = useAuthUser();

  const accessToken = user?.accessToken;

  useEffect(() => {
    if (!accessToken) return;

    const socket = connectSocket(accessToken);

    return () => {
      disconnectSocket();
    };
  }, [accessToken]);
  if (!accessToken) return null;

  return <>{children}</>;
}
