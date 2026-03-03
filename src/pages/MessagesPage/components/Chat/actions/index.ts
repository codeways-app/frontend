import { queryClient } from '@/shared/configs/queryClient';
import { ChatDto, ChatItemDto, MessageResponseDto } from '@/shared/api';

export const addMessageToChat = (
  chatId: string,
  data: Pick<MessageResponseDto, 'content' | 'sender' | 'type' | 'replyToId'>,
): string => {
  const tempId = Date.now().toString();
  const tempMessage: MessageResponseDto = {
    id: tempId,
    content: data.content,
    sender: data.sender,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'SENT',
    type: data.type,
    replyToId: data.replyToId || '',
  };

  queryClient.setQueryData(['chat', chatId], (oldData: ChatDto | undefined) => {
    if (!oldData) return oldData;

    return {
      ...oldData,
      messages: [tempMessage, ...(oldData.messages || [])],
    };
  });

  return tempId;
};

export const updateChatMessage = (
  chatId: string,
  messageId: string,
  newMessage: MessageResponseDto,
) => {
  queryClient.setQueryData(['chat', chatId], (oldData: ChatDto | undefined) => {
    if (!oldData) return oldData;

    return {
      ...oldData,
      messages: (oldData.messages || []).map((m) => (m.id === messageId ? newMessage : m)),
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
