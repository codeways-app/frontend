import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import axios from 'axios';

import { showToast } from '@/shared/components/Toast/actions';
import { publicApi } from '@/shared/api';
import { HttpStatus } from '@/shared/constants';

import { VerifyData } from '../types';

export const useVerifyEmail = () => {
  const t = useTranslations('notifications');

  return useMutation({
    mutationFn: (dto: VerifyData) => publicApi.auth.authControllerVerifyEmail(dto),
    onSuccess: () => {
      showToast({
        variant: 'success',
        title: t('auth.success.codeVerified.title'),
        description: t('auth.success.codeVerified.description'),
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === HttpStatus.BadRequest) {
          showToast({
            variant: 'failed',
            title: t('auth.error.invalidCode.title'),
            description: t('auth.error.invalidCode.description'),
          });
        } else if (status === HttpStatus.Gone) {
          showToast({
            variant: 'failed',
            title: t('auth.error.codeExpired.title'),
            description: t('auth.error.codeExpired.description'),
          });
        }
      }
    },
  });
};
