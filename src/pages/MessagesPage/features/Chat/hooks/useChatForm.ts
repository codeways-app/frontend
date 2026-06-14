import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { showToast } from '@/shared/components/Toast';

import { addMessageToChat, updateChatMessage, updateChatListCache } from '../actions';
import { useSendMessage, useSendFileMessage } from '../api';
import { DEFAULT_SEND_MESSAGE_VALUE } from '../constants';
import { isFileTypeAllowed, resolveFileContentType } from '../lib';
import { SendMessageForm, sendMessageSchema } from '../model';
import { UseChatFormProps } from '../types';

export const useChatForm = ({ selectedChat, user }: UseChatFormProps) => {
  const t = useTranslations('messages');
  const sendMessageMutation = useSendMessage();
  const sendFileMessageMutation = useSendFileMessage();

  const { register, handleSubmit, reset } = useForm<SendMessageForm>({
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

  const onFileSelect = (file: File) => {
    if (!selectedChat || !user?.isAuthenticated) return;

    if (!isFileTypeAllowed(file.name)) {
      showToast({
        variant: 'failed',
        title: t('notifications.error.fileTypeNotAllowed'),
        description: t('notifications.error.fileTypeNotAllowed'),
      });
      return;
    }

    const tempId = addMessageToChat(selectedChat, {
      content: '',
      sender: {
        id: user.id,
        login: user.login,
      },
      type: resolveFileContentType(file.type),
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
    });

    sendFileMessageMutation.mutate(
      { id: selectedChat, file },
      {
        onSuccess: (response) => {
          updateChatMessage(selectedChat, tempId, response);
          updateChatListCache(selectedChat, response);
        },
      },
    );
  };

  return { register, onSubmit, onFileSelect, reset };
};
