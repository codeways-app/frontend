'use client';

import { AppLayout } from '@/widgets/AppLayout';

import { Sidebar } from '../components/Sidebar';
import { ChatsList } from '../features/ChatsList';
import { Chat } from '../features/Chat';

import { useGetChat, useGetChatsList } from '../api';
import { useChatListResize, useMessagesState } from '../hooks';

import clsx from 'clsx';

import styles from './MessagesPage.module.css';

export const MessagesPage = () => {
  const {
    activeChat,
    activeFolder,
    setActiveFolder,
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    targetMessageId,
    targetMessageToken,
    onMessageScrolled,
    handleChatSelect,
  } = useMessagesState();

  const { width, isCollapsed, isResizing, handleMouseDown, expand } = useChatListResize();

  const chatsListQuery = useGetChatsList();
  const chatQuery = useGetChat(activeChat, {
    enabled: !!activeChat,
  });

  return (
    <AppLayout className={styles.main}>
      <Sidebar activeFolder={activeFolder} setActiveFolder={setActiveFolder} />
      <ChatsList
        query={chatsListQuery}
        selectedChat={activeChat}
        onChatSelect={handleChatSelect}
        filter={activeFilter}
        onFilterChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        width={width}
        isCollapsed={isCollapsed}
        onExpand={expand}
      />
      <div
        className={clsx(styles.resizer, isResizing && styles.resizerActive)}
        onMouseDown={handleMouseDown}
      />
      <Chat
        selectedChat={activeChat}
        query={chatQuery}
        targetMessageId={targetMessageId}
        targetMessageToken={targetMessageToken}
        onMessageScrolled={onMessageScrolled}
      />
    </AppLayout>
  );
};
