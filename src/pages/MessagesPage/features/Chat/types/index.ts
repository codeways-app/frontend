import { UseQueryResult } from '@tanstack/react-query';

import { ChatDto } from '@/shared/api';
import { User } from '@/shared/stores/app/types';

export interface ChatProps {
  selectedChat: string | null;
  query: UseQueryResult<ChatDto, Error>;
}

export interface UseChatFormProps {
  selectedChat: string | null;
  user: User | null;
}
