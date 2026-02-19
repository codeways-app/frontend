import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import axios from 'axios';

import { showToast } from '@/shared/components/Toast';
import { HttpStatus } from '@/shared/constants';
import { publicApi } from '@/shared/api';

import { RecoverFields } from '../types';

export const useRecover = () => {
  const t = useTranslations('translation.notifications');

  return useMutation({
    mutationFn: (dto: RecoverFields) => publicApi.auth.authControllerSendRecoverToken(dto),
    onSuccess: () => {
      showToast({
        variant: 'default',
        title: t('auth.сodeSent.title'),
        description: t('auth.сodeSent.description'),
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === HttpStatus.NotFound) {
          showToast({
            variant: 'failed',
            title: t('auth.userNotFound.title'),
            description: t('auth.userNotFound.description'),
          });
        }
        if (status === HttpStatus.Conflict) {
          showToast({
            variant: 'failed',
            title: t('auth.socialAccount.title'),
            description: t('auth.socialAccount.description'),
          });
        }
      } else {
        showToast({
          variant: 'failed',
          title: t('common.unknownError'),
          description: String(error),
        });
      }
    },
  });
};
