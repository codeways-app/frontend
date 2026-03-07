import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import axios from 'axios';

import { showToast } from '@/shared/components/Toast/actions';
import { HttpStatus } from '@/shared/constants';
import { setAuth } from '@/shared/stores/app';
import { publicApi } from '@/shared/api';

import { SignInFields } from '../types';

export const useSignIn = () => {
  const t = useTranslations('');

  return useMutation({
    mutationFn: (dto: SignInFields) => publicApi.auth.authControllerLogin(dto),
    onSuccess: (data) => {
      if ('accessToken' in data) {
        setAuth(data.accessToken);
        showToast({
          variant: 'success',
          title: t('auth.notifications.success.successfulAuth.title'),
          description: t('auth.notifications.success.successfulAuth.description'),
        });
      } else {
        showToast({
          variant: 'success',
          title: t('auth.notifications.info.twoFactorRequired.title'),
          description: t('auth.notifications.info.twoFactorRequired.description'),
        });
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === HttpStatus.Unauthorized || HttpStatus.BadRequest) {
          showToast({
            variant: 'failed',
            title: t('auth.notifications.error.invalidCredentials.title'),
            description: t('auth.notifications.error.invalidCredentials.description'),
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
