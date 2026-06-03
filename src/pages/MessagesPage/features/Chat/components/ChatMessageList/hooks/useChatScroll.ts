import { useCallback, useEffect, useRef, useState } from 'react';

import { MessageResponseDto } from '@/shared/api';

export const useChatScroll = (messages: MessageResponseDto[], selectedChat: string | null) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = useCallback((behavior: 'smooth' | 'auto' = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, []);

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
  }, [selectedChat]);

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom('smooth');
    }
  }, [messages, isAtBottom, scrollToBottom]);

  useEffect(() => {
    scrollToBottom('auto');
  }, [scrollToBottom, selectedChat]);

  return { messagesEndRef, scrollToBottom, showScrollButton };
};
