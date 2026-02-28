import { ChatDto } from '@/shared/api';
import { UseQueryResult } from '@tanstack/react-query';

export interface ChatProps {
  query: UseQueryResult<ChatDto, Error>;
}
