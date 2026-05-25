import { ChatDto, ChatItemDto, MessageResponseDto } from '@/shared/api';
import { queryClient } from '@/shared/configs/queryClient';

export const updateChatMessagesCache = (chatId: string, message: MessageResponseDto) => {
  queryClient.setQueryData(['chat', chatId], (oldData: ChatDto | undefined) => {
    if (!oldData) return oldData;

    const exists = oldData.messages?.some((m) => m.id === message.id);
    if (exists) return oldData;

    return {
      ...oldData,
      messages: [message, ...(oldData.messages || [])],
    };
  });
};

export const updateChatListCache = (chatId: string, message: MessageResponseDto) => {
  queryClient.setQueryData(['my-chats'], (oldData: ChatItemDto[] | undefined) => {
    if (!oldData) return oldData;

    const chatIndex = oldData.findIndex((c: ChatItemDto) => c.id === chatId);
    if (chatIndex === -1) return oldData;

    const updatedChats = [...oldData];
    const targetChat = { ...updatedChats[chatIndex] };

    targetChat.lastMessage = message;
    targetChat.unreadCount = 0;

    updatedChats.splice(chatIndex, 1);
    updatedChats.unshift(targetChat);

    return updatedChats;
  });
};
