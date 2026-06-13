import { UseQueryResult } from '@tanstack/react-query';

import { ChatResponseDto } from '@/shared/api';
import { User } from '@/shared/stores/app/types';

export interface ChatProps {
  selectedChat: string | null;
  query: UseQueryResult<ChatResponseDto, Error>;
  targetMessageId?: string | null;
  targetMessageToken?: string | null;
  onMessageScrolled?: () => void;
}

export interface UseChatFormProps {
  selectedChat: string | null;
  user: User | null;
}
