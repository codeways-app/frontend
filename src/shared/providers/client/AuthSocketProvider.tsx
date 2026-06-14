'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import { useAuthUser } from '@/shared/stores/app/hooks';
import { connectSocket, disconnectSocket } from '@/shared/socket';

import { ChatEventsManager } from './ChatEventsManager';

export const AuthSocketProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const user = useAuthUser();
  const accessToken = user?.accessToken;
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!accessToken) return;

    connectSocket(accessToken);
    setIsConnected(true);

    return () => {
      disconnectSocket();
      setIsConnected(false);
    };
  }, [accessToken]);

  return (
    <>
      {isConnected && <ChatEventsManager />}
      {children}
    </>
  );
};
