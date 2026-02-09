'use client';

import { useState } from 'react';

import { PageLayout } from '@/shared/components/PageLayout';
import { usePageTitle } from '@/shared/hooks';

import { Sidebar } from '../components/Sidebar';
import { ChatsList } from '../components/ChatList';
import { Chat } from '../components/Chat';

import { chat, chats } from '../api';

import styles from './MessagesPage.module.css';

export const MessagesPage = () => {
  const [activeFolder, setActiveFolder] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeChat, setActiveChat] = useState<number | undefined>(undefined);

  usePageTitle('Messages');

  return (
    <PageLayout className={styles.main}>
      <Sidebar activeFolder={activeFolder} setActiveFolder={setActiveFolder} />
      <ChatsList
        chats={chats}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <Chat
        messages={chat.messages}
        chatName={chat.chatName}
        additionalInfo={chat.additionalInfo}
      />
    </PageLayout>
  );
};
