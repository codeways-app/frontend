import { ChatItemDto } from '@/shared/api';
import { UseQueryResult } from '@tanstack/react-query';

export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface ChatListProps {
  query: UseQueryResult<ChatItemDto[], Error>;
  selectedChat: string | null;
  onChatSelect: (chatId: string | null) => void;
  filter: string;
  onFilterChange: (filter: string) => void;
}
