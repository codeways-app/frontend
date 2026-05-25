'use client';

import clsx from 'clsx';

import { AppLayout } from '@/widgets/AppLayout';

import { Sidebar } from '../components/Sidebar';
import { ChatsList } from '../features/ChatList';
import { Chat } from '../features/Chat';

import { useGetChat, useGetChatsList } from '../api';
import { useChatListResize, useMessagesState } from '../hooks';

import styles from './MessagesPage.module.css';

export const MessagesPage = () => {
  const {
    activeChat,
    activeFolder,
    setActiveFolder,
    activeFilter,
    setActiveFilter,
    handleChatSelect,
  } = useMessagesState();

  const { width, isCollapsed, isResizing, handleMouseDown } = useChatListResize();

  const chatsQuery = useGetChatsList();
  const chatQuery = useGetChat(activeChat, {
    enabled: !!activeChat,
  });

  return (
    <AppLayout className={styles.main}>
      <Sidebar activeFolder={activeFolder} setActiveFolder={setActiveFolder} />
      <ChatsList
        query={chatsQuery}
        selectedChat={activeChat}
        onChatSelect={handleChatSelect}
        filter={activeFilter}
        onFilterChange={setActiveFilter}
        width={width}
        isCollapsed={isCollapsed}
      />
      <div
        className={clsx(styles.resizer, isResizing && styles.resizerActive)}
        onMouseDown={handleMouseDown}
      />
      <Chat selectedChat={activeChat} query={chatQuery} />
    </AppLayout>
  );
};
