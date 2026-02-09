'use client';

import { useState } from 'react';

import { PageLayout } from '@/shared/components/PageLayout';
import { usePageTitle } from '@/shared/hooks';

import { Sidebar } from '../components/Sidebar';
import { ChatsList } from '../components/ChatList';
import { Chat } from '../components/Chat';

import styles from './MessagesPage.module.css';
import { Message } from '../components/Chat/types';

const chats = [
  {
    id: 1,
    name: 'username',
    message: 'last_message',
  },
];

const messages: Message[] = [
  {
    id: '1',
    text: 'Hello! How are you?',
    senderId: '1',
    createdAt: '12:00',
    status: 'sent',
  },
  {
    id: '2',
    text: "I'm fine, thanks! And you?",
    senderId: '2',
    createdAt: '12:01',
    status: 'delivered',
  },
];

chats.push(...Array.from({ length: 40 }, (_, i) => ({ ...chats[0], id: i + 2 })));

export const MessagesPage = () => {
  const [activeFolder, setActiveFolder] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeChat, setActiveChat] = useState<number | undefined>(undefined);

  usePageTitle('Messages');

  return (
    <PageLayout className={styles.main}>
      <Sidebar activeFolder={activeFolder} setActiveFolder={setActiveFolder} />
      <ChatsList
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <Chat messages={messages} chatName={''} additionalInfo={''} />
    </PageLayout>
  );
};
