'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { AppLayout } from '@/widgets/AppLayout';

import { usePageTitle } from '@/shared/hooks';

import { Sidebar } from '../components/Sidebar';
import { ChatsList } from '../components/ChatList';
import { Chat } from '../components/Chat';

import { useGetChat, useGetChatsList } from '../api';

import styles from './MessagesPage.module.css';

export const MessagesPage = () => {
  const params = useParams();
  const router = useRouter();
  const activeChat = params?.chatId as string | undefined;

  const [activeFolder, setActiveFolder] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const chatsQuery = useGetChatsList();
  const chatQuery = useGetChat(activeChat ?? null, {
    enabled: !!activeChat,
  });

  const handleChatSelect = (chatId: string | null) => {
    if (chatId) {
      router.push(`/messages/${chatId}`);
    } else {
      router.push('/messages');
    }
  };

  usePageTitle('Messages');

  return (
    <AppLayout className={styles.main}>
      <Sidebar activeFolder={activeFolder} setActiveFolder={setActiveFolder} />
      <ChatsList
        query={chatsQuery}
        selectedChat={activeChat ?? null}
        onChatSelect={handleChatSelect}
        filter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <Chat selectedChat={activeChat ?? null} query={chatQuery} />
    </AppLayout>
  );
};
