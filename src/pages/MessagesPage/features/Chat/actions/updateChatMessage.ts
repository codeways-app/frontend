import { queryClient } from '@/shared/configs/queryClient';
import { ChatResponseDto, MessageResponseDto } from '@/shared/api';

export const updateChatMessage = (
  chatId: string,
  messageId: string,
  newMessage: MessageResponseDto,
) => {
  queryClient.setQueryData(['chat', chatId], (oldData: ChatResponseDto | undefined) => {
    if (!oldData) return oldData;

    const messages = oldData.messages || [];

    const alreadyReceivedViaSocket = messages.some(
      (m) => m.id === newMessage.id && m.id !== messageId,
    );

    return {
      ...oldData,
      messages: alreadyReceivedViaSocket
        ? messages.filter((m) => m.id !== messageId) // Remove temporary one
        : messages.map((m) => (m.id === messageId ? newMessage : m)), // Replace temporary with real
    };
  });
};
