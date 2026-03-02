import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import axios from 'axios';

import { showToast } from '@/shared/components/Toast';
import { HttpStatus } from '@/shared/constants';
import { publicApi } from '@/shared/api';

import { SignUpFields } from '../types';

export const useSignUp = () => {
  const t = useTranslations('notifications');

  return useMutation({
    mutationFn: (dto: SignUpFields) => publicApi.auth.authControllerSendVerificationToken(dto),
    onSuccess: () => {
      showToast({
        variant: 'default',
        title: t('auth.success.codeSent.title'),
        description: t('auth.success.codeSent.description'),
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === HttpStatus.Conflict) {
          showToast({
            variant: 'failed',
            title: t('auth.error.emailExists.title'),
            description: t('auth.error.emailExists.description'),
          });
        }
      } else {
        showToast({
          variant: 'failed',
          title: t('common.error.unknownError'),
          description: String(error),
        });
      }
    },
  });
};
