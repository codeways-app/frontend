'use client';

import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const connectSocket = (token: string) => {
  if (socket) return socket;

  socket = io(process.env.NEXT_PUBLIC_WS_URL!, {
    transports: ['websocket'],
    auth: { token },
  });

  socket.on('connect', () => {});

  socket.on('disconnect', () => {});

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (!socket) return;
  socket.disconnect();
  socket = null;
};
