import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { showToast } from '@/shared/components/Toast';
import { publicApi } from '@/shared/api';

import { RecoverData } from '../../../types';

export const useNewPassword = () => {
  const t = useTranslations('');
  const router = useRouter();

  return useMutation({
    mutationFn: (dto: RecoverData) => publicApi.auth.authControllerRecover(dto),
    onSuccess: () => {
      router.push('/sign-in');
      showToast({
        variant: 'success',
        title: t('auth.notifications.success.passwordChanged.title'),
        description: t('auth.notifications.success.passwordChanged.description'),
      });
    },
    onError: (error) => {
      showToast({
        variant: 'failed',
        title: t('common.notifications.error.unknownError'),
        description: String(error),
      });
    },
  });
};
