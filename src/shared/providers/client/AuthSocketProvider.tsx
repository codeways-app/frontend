'use client';

import { FC, ReactNode, useEffect } from 'react';

import { useAuthUser } from '@/shared/stores/app/hooks';
import { connectSocket, disconnectSocket } from '@/shared/socket';

export const AuthSocketProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const user = useAuthUser();

  const accessToken = user?.accessToken;

  useEffect(() => {
    if (!accessToken) return;

    connectSocket(accessToken);

    return () => {
      disconnectSocket();
    };
  }, [accessToken]);

  if (!accessToken) return null;

  return <>{children}</>;
};
