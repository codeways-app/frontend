import { ChatDto } from '@/shared/api';
import { UseQueryResult } from '@tanstack/react-query';

export interface ChatProps {
  selectedChat: string | null;
  query: UseQueryResult<ChatDto, Error>;
}
