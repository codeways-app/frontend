import { ChatFilters } from '../components/ChatFilters';
import { SkeletonList } from '../components/SkeletonList';
import { ChatItem } from '../components/ChatItem';

import { useResetUnreadCount } from '../hooks';
import { useSearchChats } from '../../../api';

import { ChatListProps } from '../types';

import styles from './ChatsList.module.css';

export const ChatsList = ({
  query,
  selectedChat,
  onChatSelect,
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  width,
  isCollapsed,
  onExpand,
}: ChatListProps) => {
  const handleChatClick = (chatId: string, messageId?: string) => () => {
    onChatSelect(chatId, messageId);
    (document.activeElement as HTMLElement)?.blur();
  };

  useResetUnreadCount(selectedChat!);

  const searchResult = useSearchChats(searchQuery);
  const isSearchActive = searchQuery.trim().length >= 2;
  const activeQuery = isSearchActive ? searchResult : query;

  return (
    <div className={styles.list} style={{ width: width, flexShrink: 0 }}>
      <ChatFilters
        filter={filter}
        onFilterChange={onFilterChange}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        isCollapsed={isCollapsed}
        onExpand={onExpand}
      />
      <ul className={styles.chats}>
        {activeQuery.isLoading && <SkeletonList />}
        {activeQuery.data?.map((chat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            isActive={chat.id === selectedChat}
            onClick={handleChatClick(chat.id, isSearchActive ? chat.lastMessage?.id : undefined)}
            isCollapsed={isCollapsed}
          />
        ))}
      </ul>
    </div>
  );
};
