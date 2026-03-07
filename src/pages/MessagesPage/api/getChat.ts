import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { showToast } from '@/shared/components/Toast';

import { api } from '@/shared/api';

export const fetchChatById = (id: string | null) =>
  api.chats.chatControllerGetChatById(id as string);

export const useGetMyChat = (id: string | null, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['chat', id],
    queryFn: () => fetchChatById(id),
    enabled: options?.enabled ?? Boolean(id),
  });
};

export const useGetChat = (id: string | null, options?: { enabled?: boolean }) => {
  const t = useTranslations('messages.notifications');
  const query = useGetMyChat(id, options);

  const { isError, error } = query;

  useEffect(() => {
    if (isError) {
      showToast({
        variant: 'failed',
        title: t('error.failedToLoadChat'),
        description: String(error),
      });
    }
  }, [isError, error, t]);

  return query;
};
