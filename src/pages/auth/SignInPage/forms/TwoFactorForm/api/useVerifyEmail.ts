import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import axios from 'axios';

import { showToast } from '@/shared/components/Toast';
import { HttpStatus, ROUTES } from '@/shared/constants';
import { setAuth } from '@/shared/stores/app';
import { publicApi } from '@/shared/api';

import { TwoFactorData } from '../types';

export const useVerifyEmail = () => {
  const t = useTranslations('notifications');
  const router = useRouter();

  return useMutation({
    mutationFn: (dto: TwoFactorData) => publicApi.auth.authControllerTwoFactor(dto),
    onSuccess: (data) => {
      setAuth(data.accessToken);
      showToast({
        variant: 'success',
        title: t('auth.success.successfulAuth.title'),
        description: t('auth.success.successfulAuth.description'),
      });
      router.push(ROUTES.dashboard.main());
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === HttpStatus.Unauthorized) {
          showToast({
            variant: 'failed',
            title: t('auth.error.invalidTwoFactor.title'),
            description: t('auth.error.invalidTwoFactor.description'),
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
