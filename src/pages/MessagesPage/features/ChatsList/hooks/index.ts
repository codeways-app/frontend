import { ChatItemResponseDto } from '@/shared/api';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useResetUnreadCount = (selectedChat?: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!selectedChat) return;

    queryClient.setQueryData(['my-chats'], (oldData: ChatItemResponseDto[] | undefined) => {
      if (!oldData) return oldData;

      const hasUnread = oldData.some(
        (chat) => chat.id === selectedChat && (chat.unreadCount ?? 0) > 0,
      );

      if (!hasUnread) return oldData;

      return oldData.map((chat) => (chat.id === selectedChat ? { ...chat, unreadCount: 0 } : chat));
    });
  }, [selectedChat, queryClient]);
};
