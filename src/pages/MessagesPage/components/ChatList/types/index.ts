import { ChatItemDto } from '@/shared/api';

export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface ChatListProps {
  chats: ChatItemDto[] | null;
  activeChat: string | null;
  setActiveChat: (chatId: string | null) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}
