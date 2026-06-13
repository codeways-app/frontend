import { useEffect, useRef } from 'react';

import { MessageResponseDto } from '@/shared/api';

import { useBottomAnchor } from './useBottomAnchor';
import { useScrollToTarget } from './useScrollToTarget';

export const useChatScroll = (
  messages: MessageResponseDto[],
  selectedChat: string | null,
  targetMessageId?: string | null,
  targetMessageToken?: string | null,
  onMessageScrolled?: () => void,
) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastChatRef = useRef<string | null>(null);

  const { highlightedMessageId, hasPendingTarget, skipAutoScroll } = useScrollToTarget(
    messagesEndRef,
    messages,
    targetMessageId,
    targetMessageToken,
    onMessageScrolled,
  );

  const { showScrollButton, scrollToBottom } = useBottomAnchor(
    messagesEndRef,
    messages,
    selectedChat,
    skipAutoScroll,
  );

  // Jump to the bottom when switching chats — but only once per chat, and not
  // when a search result requested scrolling to a specific message instead.
  useEffect(() => {
    if (lastChatRef.current === selectedChat) return;
    lastChatRef.current = selectedChat;

    if (hasPendingTarget) return;
    scrollToBottom('auto');
  }, [selectedChat, hasPendingTarget, scrollToBottom]);

  return { messagesEndRef, scrollToBottom, showScrollButton, highlightedMessageId };
};