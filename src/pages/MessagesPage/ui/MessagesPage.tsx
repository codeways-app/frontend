'use client';

import { useState } from 'react';

import { AppLayout } from '@/widgets/AppLayout';
import { usePageTitle } from '@/shared/hooks';

import { Sidebar } from '../components/Sidebar';
import { ChatsList } from '../components/ChatList';
import { Chat } from '../components/Chat';

import styles from './MessagesPage.module.css';
import { useGetChat, useGetMyChats } from '../api';

export const MessagesPage = () => {
  const [activeFolder, setActiveFolder] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeChat, setActiveChat] = useState<string | undefined>(undefined);

  const { data: chatsData } = useGetMyChats();
  const { data: activeChatData } = useGetChat(activeChat);

  usePageTitle('Messages');

  return (
    <AppLayout className={styles.main}>
      <Sidebar activeFolder={activeFolder} setActiveFolder={setActiveFolder} />
      <ChatsList
        chats={chatsData || null}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <Chat
        messages={activeChatData?.messages}
        chatName={activeChatData?.title || ''}
        additionalInfo={activeChatData?.additionalInfo || ''}
      />
    </AppLayout>
  );
};
