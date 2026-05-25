import { ChatFilters } from '../components/ChatFilters';
import { SkeletonList } from '../components/SkeletonList';
import { ChatItem } from '../components/ChatItem';

import { ChatListProps } from '../types';

import styles from './ChatsList.module.css';

export const ChatsList = ({
  query,
  selectedChat,
  onChatSelect,
  filter,
  onFilterChange,
  width,
  isCollapsed,
}: ChatListProps) => {
  const handleChatClick = (chatId: string) => () => {
    onChatSelect(chatId);
  };

  return (
    <div className={styles.list} style={{ width: width, flexShrink: 0 }}>
      <ChatFilters filter={filter} onFilterChange={onFilterChange} isCollapsed={isCollapsed} />
      <ul className={styles.chats}>
        {query.isLoading && <SkeletonList />}
        {query.data?.map((chat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            isActive={chat.id === selectedChat}
            onClick={handleChatClick(chat.id)}
            isCollapsed={isCollapsed}
          />
        ))}
      </ul>
    </div>
  );
};
