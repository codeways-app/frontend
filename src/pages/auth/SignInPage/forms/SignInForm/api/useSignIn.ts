import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import axios from 'axios';

import { showToast } from '@/shared/components/Toast/actions';
import { HttpStatus } from '@/shared/constants';
import { setAuth } from '@/shared/stores/app';
import { publicApi } from '@/shared/api';

import { SignInFields } from '../types';

export const useSignIn = () => {
  const t = useTranslations('translation.notifications');

  return useMutation({
    mutationFn: (dto: SignInFields) => publicApi.api.authControllerLogin(dto),
    onSuccess: (data) => {
      if ('accessToken' in data) {
        setAuth(data.accessToken);
        showToast({
          variant: 'success',
          title: t('auth.successfulAuth.title'),
          description: t('auth.successfulAuth.description'),
        });
      } else {
        showToast({
          variant: 'success',
          title: t('auth.twoFactorRequired.title'),
          description: t('auth.twoFactorRequired.description'),
        });
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === HttpStatus.Unauthorized || HttpStatus.BadRequest) {
          showToast({
            variant: 'failed',
            title: t('auth.invalidCredentials.title'),
            description: t('auth.invalidCredentials.description'),
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
