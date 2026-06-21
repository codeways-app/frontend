import { ChatResponseDto, ChatItemResponseDto, MessageResponseDto } from '@/shared/api';
import { queryClient } from '@/shared/configs/queryClient';

export const updateChatMessagesCache = (chatId: string, message: MessageResponseDto) => {
  queryClient.setQueryData(['chat', chatId], (oldData: ChatResponseDto | undefined) => {
    if (!oldData) return oldData;

    const exists = oldData.messages?.some((m) => m.id === message.id);
    if (exists) return oldData;

    return {
      ...oldData,
      messages: [message, ...(oldData.messages || [])],
    };
  });
};

export const updateChatListCache = (
  chatId: string,
  message: MessageResponseDto,
  currentUserId?: string,
  activeChatId?: string,
) => {
  queryClient.setQueryData(['my-chats'], (oldData: ChatItemResponseDto[] | undefined) => {
    if (!oldData) return oldData;

    const chatIndex = oldData.findIndex((c: ChatItemResponseDto) => c.id === chatId);
    if (chatIndex === -1) return oldData;

    const updatedChats = [...oldData];
    const targetChat = { ...updatedChats[chatIndex] };

    targetChat.lastMessage = message;

    const isMessageFromMe = currentUserId && message.sender.id === currentUserId;
    const isActiveChat = activeChatId && chatId === activeChatId;

    if (isMessageFromMe || isActiveChat) {
      targetChat.unreadCount = 0;
    } else {
      targetChat.unreadCount = (targetChat.unreadCount ?? 0) + 1;
    }

    updatedChats.splice(chatIndex, 1);
    updatedChats.unshift(targetChat);

    return updatedChats;
  });
};
