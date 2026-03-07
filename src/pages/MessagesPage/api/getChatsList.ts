import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { showToast } from '@/shared/components/Toast';

import { api } from '@/shared/api';

export const fetchMyChats = () => api.chats.chatControllerGetMyChats();

export const useGetMyChats = () => {
  return useQuery({
    queryKey: ['my-chats'],
    queryFn: fetchMyChats,
  });
};

export const useGetChatsList = () => {
  const t = useTranslations('messages.notifications');
  const query = useGetMyChats();

  const { isError, error } = query;

  useEffect(() => {
    if (isError) {
      showToast({
        variant: 'failed',
        title: t('error.failedToLoadChatsList'),
        description: String(error),
      });
    }
  }, [isError, error, t]);

  return query;
};
