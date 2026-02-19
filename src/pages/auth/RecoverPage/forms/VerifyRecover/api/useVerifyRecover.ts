import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import axios from 'axios';

import { showToast } from '@/shared/components/Toast/actions';
import { publicApi } from '@/shared/api';
import { HttpStatus } from '@/shared/constants';

import { VerifyData } from '../types';

export const useVerifyRecover = () => {
  const t = useTranslations('translation.notifications');

  return useMutation({
    mutationFn: (dto: VerifyData) => publicApi.auth.authControllerVerifyRecover(dto),
    onSuccess: () => {
      showToast({
        variant: 'success',
        title: t('auth.recoverVerified.title'),
        description: t('auth.recoverVerified.description'),
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === HttpStatus.BadRequest) {
          showToast({
            variant: 'failed',
            title: t('auth.invalidCode.title'),
            description: t('auth.invalidCode.description'),
          });
        } else if (status === HttpStatus.Gone) {
          showToast({
            variant: 'failed',
            title: t('auth.codeExpired.title'),
            description: t('auth.codeExpired.description'),
          });
        }
      }
    },
  });
};
