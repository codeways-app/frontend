import { ChatItemResponseDto } from '@/shared/api';
import { UseQueryResult } from '@tanstack/react-query';

export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface ChatListProps {
  query: UseQueryResult<ChatItemResponseDto[], Error>;
  selectedChat: string | null;
  onChatSelect: (chatId: string | null, messageId?: string) => void;
  filter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  width?: number;
  isCollapsed?: boolean;
  onExpand?: () => void;
}
