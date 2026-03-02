import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { showToast } from '@/shared/components/Toast';
import { publicApi } from '@/shared/api';

import { RecoverData } from '../../../types';

export const useNewPassword = () => {
  const t = useTranslations('notifications');
  const router = useRouter();

  return useMutation({
    mutationFn: (dto: RecoverData) => publicApi.auth.authControllerRecover(dto),
    onSuccess: () => {
      router.push('/sign-in');
      showToast({
        variant: 'success',
        title: t('auth.success.passwordChanged.title'),
        description: t('auth.success.passwordChanged.description'),
      });
    },
    onError: (error) => {
      showToast({
        variant: 'failed',
        title: t('auth.error.unknownError'),
        description: String(error),
      });
    },
  });
};
