import { ChatItemDto } from '@/shared/api';

export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface ChatListProps {
  chats: ChatItemDto[] | null;
  activeChat: string | undefined;
  setActiveChat: (chatId: string | undefined) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}
