import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { api } from '@/shared/api';
import { showToast } from '@/shared/components/Toast';

export const fetchMyChats = () => api.chats.chatControllerGetMyChats();

export const useGetMyChats = () => {
  return useQuery({
    queryKey: ['my-chats'],
    queryFn: fetchMyChats,
  });
};

export const useGetChatsList = () => {
  const t = useTranslations('translation.notifications');
  const query = useGetMyChats();

  const { isError, error } = query;

  useEffect(() => {
    if (isError) {
      showToast({
        variant: 'failed',
        title: t('messages.failedToLoadChatsList'),
        description: String(error),
      });
    }
  }, [isError, error, t]);

  return query;
};
