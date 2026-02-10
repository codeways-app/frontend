export type MessageStatus = 'sent' | 'delivered' | 'read';

export type ChatType = {
  id: number;
  name: string;
  lastMessage: {
    text: string;
    createdAt: string;
    senderId: string;
    status: MessageStatus;
  };
  unreadCount: number;
};

export interface ChatListProps {
  chats: ChatType[];
  activeChat: number | undefined;
  setActiveChat: (chatId: number | undefined) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}
