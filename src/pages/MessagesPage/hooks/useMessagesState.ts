'use client';

import { useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { usePageTitle } from '@/shared/hooks';

const TARGET_MESSAGE_PARAM = 'm';
const TARGET_REQUEST_PARAM = 't';

export const useMessagesState = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawChatId = params?.chatId;
  const activeChat = Array.isArray(rawChatId) ? rawChatId[0] : (rawChatId as string | undefined);

  const [activeFolder, setActiveFolder] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Kept in the URL (not component state) — navigating to a chat remounts this page,
  // which would otherwise wipe out plain React state before it reaches the Chat feature.
  const targetMessageId = searchParams?.get(TARGET_MESSAGE_PARAM) ?? null;
  const targetRequestId = searchParams?.get(TARGET_REQUEST_PARAM) ?? null;
  // Combines the message id with a per-click nonce so every click — even on the
  // same message in an already-open chat — is treated as a fresh scroll request.
  const targetMessageToken =
    targetMessageId && targetRequestId ? `${targetMessageId}:${targetRequestId}` : null;

  const handleChatSelect = (chatId: string | null, messageId?: string) => {
    if (!chatId) {
      router.push('/messages');
      return;
    }
    const nonce = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const query = messageId
      ? `?${TARGET_MESSAGE_PARAM}=${encodeURIComponent(messageId)}&${TARGET_REQUEST_PARAM}=${nonce}`
      : '';
    router.push(`/messages/${chatId}${query}`);
  };

  const onMessageScrolled = () => {
    if (activeChat) {
      router.replace(`/messages/${activeChat}`);
    }
  };

  usePageTitle('Messages');

  return {
    activeChat: activeChat ?? null,
    activeFolder,
    setActiveFolder,
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    targetMessageId,
    targetMessageToken,
    onMessageScrolled,
    handleChatSelect,
  };
};
