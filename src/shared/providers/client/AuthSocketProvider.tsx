'use client';

import { FC, ReactNode, useEffect } from 'react';

import { redirect } from 'next/navigation';

import { useAuthUser } from '@/shared/stores/app/hooks';
import { connectSocket, disconnectSocket } from '@/shared/socket';
import { ROUTES } from '@/shared/constants';

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

  if (!accessToken) redirect(ROUTES.auth.signIn());

  return <>{children}</>;
};
