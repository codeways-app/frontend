export interface ChatListProps {
  activeChat: number | undefined;
  setActiveChat: (chatId: number | undefined) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}
