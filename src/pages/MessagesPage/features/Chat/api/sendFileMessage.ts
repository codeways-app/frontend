import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';

import { publicApi } from '@/shared/api';
import { showToast } from '@/shared/components/Toast';
import { HttpStatus } from '@/shared/constants';

import axios from 'axios';

export const useSendFileMessage = () => {
  const t = useTranslations('messages');

  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) =>
      publicApi.chats.sendFile(id, { file }),
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === HttpStatus.Conflict) {
          showToast({
            variant: 'failed',
            title: t('notifications.error.messageNotSent'),
            description: t('notifications.error.messageNotSent'),
          });
        }
      } else {
        showToast({
          variant: 'failed',
          title: t('notifications.error.messageNotSent'),
          description: String(error),
        });
      }
    },
  });
};
