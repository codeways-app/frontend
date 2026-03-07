import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import axios from 'axios';

import { showToast } from '@/shared/components/Toast';
import { HttpStatus } from '@/shared/constants';
import { publicApi } from '@/shared/api';

import { RecoverFields } from '../types';

export const useRecover = () => {
  const t = useTranslations('');

  return useMutation({
    mutationFn: (dto: RecoverFields) => publicApi.auth.authControllerSendRecoverToken(dto),
    onSuccess: () => {
      showToast({
        variant: 'default',
        title: t('auth.notifications.success.codeSent.title'),
        description: t('auth.notifications.success.codeSent.description'),
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === HttpStatus.NotFound) {
          showToast({
            variant: 'failed',
            title: t('auth.notifications.error.userNotFound.title'),
            description: t('auth.notifications.error.userNotFound.description'),
          });
        }
        if (status === HttpStatus.Conflict) {
          showToast({
            variant: 'failed',
            title: t('auth.notifications.error.socialAccount.title'),
            description: t('auth.notifications.error.socialAccount.description'),
          });
        }
      } else {
        showToast({
          variant: 'failed',
          title: t('common.notifications.error.unknownError'),
          description: String(error),
        });
      }
    },
  });
};
