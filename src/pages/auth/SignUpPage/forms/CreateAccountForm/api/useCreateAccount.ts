import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import axios from 'axios';

import { showToast } from '@/shared/components/Toast';
import { HttpStatus, ROUTES } from '@/shared/constants';
import { publicApi } from '@/shared/api';

import { SignUpData } from '../../../types';

export const useCreateAccount = () => {
  const t = useTranslations('');
  const router = useRouter();

  return useMutation({
    mutationFn: (dto: SignUpData) => publicApi.auth.authControllerRegister(dto),
    onSuccess: () => {
      router.push(ROUTES.auth.signIn());
      showToast({
        variant: 'success',
        title: t('auth.notifications.success.accountCreated.title'),
        description: t('auth.notifications.success.accountCreated.description'),
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === HttpStatus.Conflict) {
          showToast({
            variant: 'failed',
            title: t('auth.notifications.error.loginExist.title'),
            description: t('auth.notifications.error.loginExist.description'),
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
