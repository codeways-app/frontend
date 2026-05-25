import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';

import { useAuthUser } from '@/shared/stores/app/hooks';
import { getSocket } from '@/shared/socket';
import { api, MessageResponseDto } from '@/shared/api';
import { showToast } from '@/shared/components/Toast';

import { updateChatListCache, updateChatMessagesCache } from '../actions/chatCache';

export const useChatEvents = () => {
  const user = useAuthUser();
  const socket = getSocket();

  const params = useParams();
  const rawChatId = params?.chatId;
  const activeChat = Array.isArray(rawChatId) ? rawChatId[0] : (rawChatId as string | undefined);

  const activeChatRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    activeChatRef.current = activeChat;
  }, [activeChat]);

  useEffect(() => {
    if (!socket || !user?.accessToken) return;

    api.chats
      .chatControllerGetMyChats()
      .then((chats) => {
        chats.forEach((chat) => {
          socket.emit('joinRoom', chat.id);
        });
      })
      .catch(console.error);

    const handleNewMessage = (payload: { chatId: string; message: MessageResponseDto }) => {
      const { chatId, message } = payload;

      if (!chatId || !message?.id) return;

      if (chatId !== activeChatRef.current && message.sender.id !== user?.id) {
        const senderName = message.sender.name || message.sender.login || 'New message';
        showToast({
          description: message.content,
          title: senderName,
        });
      }

      updateChatMessagesCache(chatId, message);
      updateChatListCache(chatId, message);
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [socket, user?.accessToken, user?.id]);
};
