export type ChatType = {
  id: number;
  name: string;
  lastMessage: string;
  unreadCount: number;
};

export interface ChatListProps {
  chats: ChatType[];
  activeChat: number | undefined;
  setActiveChat: (chatId: number | undefined) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}
