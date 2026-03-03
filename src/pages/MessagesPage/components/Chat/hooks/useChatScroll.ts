import { useEffect, useRef } from 'react';

import { MessageResponseDto } from '@/shared/api';

export const useChatScroll = (
  messages: MessageResponseDto[] | undefined,
  selectedChat: string | null,
) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (behavior: 'smooth' | 'auto' = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom('smooth');
  }, [messages, selectedChat]);

  return { messagesEndRef, scrollToBottom };
};
