import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';

import { SendMessageDto, publicApi } from '@/shared/api';
import { showToast } from '@/shared/components/Toast';
import { HttpStatus } from '@/shared/constants';

import axios from 'axios';

export const useSendMessage = () => {
  const t = useTranslations('notifications');

  return useMutation({
    mutationFn: (dto: SendMessageDto) => publicApi.chats.chatControllerSendMessage(dto.chatId, dto),
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === HttpStatus.Conflict) {
          showToast({
            variant: 'failed',
            title: t('messages.error.messageNotSent'),
            description: t('messages.error.messageNotSent'),
          });
        }
      } else {
        showToast({
          variant: 'failed',
          title: t('messages.error.messageNotSent'),
          description: String(error),
        });
      }
    },
  });
};
