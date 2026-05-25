'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { usePageTitle } from '@/shared/hooks';

export const useMessagesState = () => {
  const params = useParams();
  const router = useRouter();
  const rawChatId = params?.chatId;
  const activeChat = Array.isArray(rawChatId) ? rawChatId[0] : (rawChatId as string | undefined);

  const [activeFolder, setActiveFolder] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const handleChatSelect = (chatId: string | null) => {
    if (chatId) {
      router.push(`/messages/${chatId}`);
    } else {
      router.push('/messages');
    }
  };

  usePageTitle('Messages');

  return {
    activeChat: activeChat ?? null,
    activeFolder,
    setActiveFolder,
    activeFilter,
    setActiveFilter,
    handleChatSelect,
  };
};
