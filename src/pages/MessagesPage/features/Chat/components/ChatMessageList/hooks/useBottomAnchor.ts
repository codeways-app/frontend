import { useCallback, useEffect, useState } from 'react';
import type { RefObject } from 'react';

import { MessageResponseDto } from '@/shared/api';

export const useBottomAnchor = (
  messagesEndRef: RefObject<HTMLDivElement | null>,
  messages: MessageResponseDto[],
  selectedChat: string | null,
  skipAutoScroll: boolean,
) => {
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = useCallback(
    (behavior: 'smooth' | 'auto' = 'smooth') => {
      messagesEndRef.current?.scrollIntoView({ behavior });
    },
    [messagesEndRef],
  );

  useEffect(() => {
    const el = messagesEndRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAtBottom(entry.isIntersecting);
        setShowScrollButton(!entry.isIntersecting);
      },
      {
        root: el.parentElement,
        rootMargin: '0px 0px 100% 0px',
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [selectedChat, messagesEndRef]);

  // Keep the view pinned to the bottom as new messages arrive, unless a
  // search-result scroll to a specific message is in progress.
  useEffect(() => {
    if (skipAutoScroll) return;
    if (isAtBottom) {
      scrollToBottom('smooth');
    }
  }, [messages, isAtBottom, scrollToBottom, skipAutoScroll]);

  return { isAtBottom, showScrollButton, scrollToBottom };
};