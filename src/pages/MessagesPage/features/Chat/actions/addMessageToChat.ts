import { queryClient } from '@/shared/configs/queryClient';
import { ChatDto, MessageResponseDto } from '@/shared/api';

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
