import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { addMessageToChat, updateChatMessage, updateChatListCache } from '../actions';
import { useSendMessage } from '../api';
import { DEFAULT_SEND_MESSAGE_VALUE } from '../constants';
import { SendMessageForm, sendMessageSchema } from '../model';
import { UseChatFormProps } from '../types';

export const useChatForm = ({ selectedChat, user }: UseChatFormProps) => {
  const sendMessageMutation = useSendMessage();

  const { register, handleSubmit, reset, setValue, getValues } = useForm<SendMessageForm>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: DEFAULT_SEND_MESSAGE_VALUE,
  });

  const onSubmit = handleSubmit((values) => {
    if (!selectedChat || !user?.isAuthenticated) return;

    const { content, type, replyToId } = values;

    const tempId = addMessageToChat(selectedChat, {
      content,
      sender: {
        id: user.id,
        login: user.login,
      },
      ...(replyToId && { replyToId }),
      type,
    });

    sendMessageMutation.mutate(
      {
        id: selectedChat,
        data: {
          content,
          ...(replyToId && { replyToId }),
          type,
        },
      },
      {
        onSuccess: (response) => {
          updateChatMessage(selectedChat, tempId, response);
          updateChatListCache(selectedChat, response);
        },
      },
    );

    reset(DEFAULT_SEND_MESSAGE_VALUE);
  });

  return { register, onSubmit, reset, setValue, getValues };
};
