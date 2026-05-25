'use client';

import { useChatEvents } from '@/shared/socket/hooks/useChatEvents';

export const ChatEventsManager = () => {
  useChatEvents();
  return null;
};
