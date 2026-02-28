'use client';

import { useState } from 'react';

import { AppLayout } from '@/widgets/AppLayout';
import { Text } from '@/shared/components/Text';

import { usePageTitle } from '@/shared/hooks';

import { Sidebar } from '../components/Sidebar';
import { ChatsList } from '../components/ChatList';
import { Chat } from '../components/Chat';

import { useGetChat, useGetMyChats } from '../api';

import styles from './MessagesPage.module.css';

export const MessagesPage = () => {
  const [activeFolder, setActiveFolder] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const chatsQuery = useGetMyChats();
  const chatQuery = useGetChat(activeChat, {
    enabled: !!activeChat,
  });

  usePageTitle('Messages');

  return (
    <AppLayout className={styles.main}>
      <Sidebar activeFolder={activeFolder} setActiveFolder={setActiveFolder} />
      <ChatsList
        query={chatsQuery}
        selectedChat={activeChat}
        onChatSelect={setActiveChat}
        filter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      {activeChat ? (
        <Chat query={chatQuery} />
      ) : (
        <div className={styles.select}>
          <div className={styles.card}>
            <Text variant='title2'>No chat selected</Text>
            <Text>Please select a chat to start messaging</Text>
          </div>
        </div>
      )}
    </AppLayout>
  );
};
