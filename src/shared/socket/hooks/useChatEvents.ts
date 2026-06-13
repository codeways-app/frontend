import { useEffect, useRef } from 'react';

import { useAuthUser } from '@/shared/stores/app/hooks';
import { getSocket } from '@/shared/socket';
import { MessageResponseDto } from '@/shared/api';
import { showToast } from '@/shared/components/Toast';

import { updateChatListCache, updateChatMessagesCache } from '../actions/chatCache';
import { useActiveChatId } from './useActiveChatId';
import { useChatRooms } from './useChatRooms';

export const useChatEvents = () => {
  const user = useAuthUser();
  const socket = getSocket();
  const activeChat = useActiveChatId();
  const activeChatRef = useRef<string | undefined>(undefined);

  useChatRooms(socket, user?.accessToken);

  useEffect(() => {
    activeChatRef.current = activeChat;
  }, [activeChat]);

  useEffect(() => {
    if (!socket || !user?.accessToken) return;

    const handleNewMessage = (payload: { chatId: string; message: MessageResponseDto }) => {
      const { chatId, message } = payload;
      if (!chatId || !message?.id) return;

      if (chatId !== activeChatRef.current && message.sender.id !== user.id) {
        showToast({
          title: message.sender.name || message.sender.login || 'New message',
          description: message.content,
        });
      }

      updateChatMessagesCache(chatId, message);
      updateChatListCache(chatId, message, user.id, activeChatRef.current);
    };

    socket.on('newMessage', handleNewMessage);
    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [socket, user?.accessToken, user?.id]);
};
