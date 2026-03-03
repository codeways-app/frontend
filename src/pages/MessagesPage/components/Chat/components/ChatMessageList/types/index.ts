import { RefObject } from 'react';

import { MessageResponseDto } from '@/shared/api';
import { User } from '@/shared/stores/app/types';

export interface ChatMessageListProps {
  messages: MessageResponseDto[];
  user: User | null;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}
