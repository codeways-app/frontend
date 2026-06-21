import { queryClient } from '@/shared/configs/queryClient';
import { ChatResponseDto, MessageResponseDto } from '@/shared/api';

export const addMessageToChat = (
  chatId: string,
  data: Pick<
    MessageResponseDto,
    'content' | 'sender' | 'type' | 'replyToId' | 'fileName' | 'fileSize' | 'mimeType'
  >,
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
    ...(data.fileName && { fileName: data.fileName }),
    ...(data.fileSize !== undefined && { fileSize: data.fileSize }),
    ...(data.mimeType && { mimeType: data.mimeType }),
  };

  queryClient.setQueryData(['chat', chatId], (oldData: ChatResponseDto | undefined) => {
    if (!oldData) return oldData;

    return {
      ...oldData,
      messages: [tempMessage, ...(oldData.messages || [])],
    };
  });

  return tempId;
};
