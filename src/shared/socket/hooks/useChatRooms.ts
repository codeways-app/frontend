import { useEffect } from 'react';
import { Socket } from 'socket.io-client';

import { api } from '@/shared/api';

export const useChatRooms = (socket: Socket | null, accessToken?: string) => {
  useEffect(() => {
    if (!socket || !accessToken) return;

    let cancelled = false;

    api.chats.getMyChats().then((chats) => {
      if (cancelled) return;
      chats.forEach((chat) => socket.emit('joinRoom', chat.id));
    });

    return () => {
      cancelled = true;
    };
  }, [socket, accessToken]);
};
