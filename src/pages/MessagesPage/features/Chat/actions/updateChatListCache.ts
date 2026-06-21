import { queryClient } from '@/shared/configs/queryClient';
import { ChatItemResponseDto, MessageResponseDto } from '@/shared/api';

export const updateChatListCache = (chatId: string, message: MessageResponseDto) => {
  queryClient.setQueryData(['my-chats'], (oldData: ChatItemResponseDto[] | undefined) => {
    if (!oldData) return oldData;

    const chatIndex = oldData.findIndex((c: ChatItemResponseDto) => c.id === chatId);
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
