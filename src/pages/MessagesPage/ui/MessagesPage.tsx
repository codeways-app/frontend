'use client';

import { Text } from '@/shared/components/Text';

import styles from './MessagesPage.module.css';
import {
  CheckCheck,
  EllipsisVertical,
  Paperclip,
  Plus,
  Search,
  Send,
  Shield,
  Smile,
  Users,
} from 'lucide-react';
import { PageLayout } from '@/shared/components/PageLayout';
import clsx from 'clsx';
import { TextInput } from '@/shared/components/TextInput';
import { useState } from 'react';
import { Button } from '@/shared/components/Button';

const chats = [
  {
    id: 1,
    name: 'username',
    message: 'last_message',
  },
];

chats.push(...Array.from({ length: 40 }, (_, i) => ({ ...chats[0], id: i + 2 })));

export const MessagesPage = () => {
  const [activeFolder, setActiveFolder] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeChat, setActiveChat] = useState<number | undefined>(undefined);

  return (
    <PageLayout className={styles.main}>
      <ul className={styles.sidebar}>
        <li className={clsx(styles.folder, activeFolder === 0 && styles.activeFolder)}>
          <Button
            variant={activeFolder === 0 ? 'white' : 'gray'}
            vertical
            size='xxs'
            icon={<Users />}
            onClick={() => setActiveFolder(0)}
          >
            All chats
          </Button>
        </li>
        <li className={clsx(styles.folder, activeFolder === 1 && styles.activeFolder)}>
          <Button
            icon={<Shield />}
            variant={activeFolder === 1 ? 'white' : 'gray'}
            vertical
            size='xxs'
            onClick={() => setActiveFolder(1)}
          >
            Clan
          </Button>
        </li>
        <li className={clsx(styles.folder, activeFolder === 2 && styles.activeFolder)}>
          <Button
            variant={activeFolder === 2 ? 'white' : 'gray'}
            icon={<Plus />}
            vertical
            size='xxs'
            onClick={() => setActiveFolder(2)}
          >
            Add folder
          </Button>
        </li>
      </ul>
      <div className={styles.chatsList}>
        <div className={styles.searchWrapper}>
          <TextInput
            className={styles.search}
            placeholder='Search...'
            label='Search...'
            hideLabel
            noBorder
            endIcon={<Search />}
          />
          <ul className={styles.filters}>
            <li>
              <Button
                className={styles.filter}
                size='xs'
                variant={activeFilter === 'all' ? 'primary' : 'transparentWhite'}
                onClick={() => setActiveFilter('all')}
              >
                All
              </Button>
            </li>
            <li>
              <Button
                className={styles.filter}
                size='xs'
                variant={activeFilter === 'unread' ? 'primary' : 'transparentWhite'}
                onClick={() => setActiveFilter('unread')}
              >
                Unread
              </Button>
            </li>
            <li>
              <Button
                className={styles.filter}
                size='xs'
                variant={activeFilter === 'groups' ? 'primary' : 'transparentWhite'}
                onClick={() => setActiveFilter('groups')}
              >
                Groups
              </Button>
            </li>
          </ul>
        </div>
        <ul className={styles.chats}>
          {chats.map((chat) => (
            <li
              key={chat.id}
              className={clsx(styles.miniChat, chat.id === activeChat && styles.activeChat)}
              onClick={() => setActiveChat(chat.id)}
            >
              <div className={styles.avatar}></div>
              <div>
                <Text variant='text1'>{chat.name}</Text>
                <Text variant='text2'>{chat.message}</Text>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.chat}>
        <div className={styles.header}>
          <div className={styles.info}>
            <Text variant='text1'>Chat name</Text>
            <Text variant='caption'>Addition info</Text>
          </div>
          <div className={styles.tools}>
            <Search />
            <EllipsisVertical />
          </div>
        </div>
        <div className={styles.content}>
          <div className={clsx(styles.message, styles.incomingMessage)}>
            <Text variant='text1'>Hello! How are you?</Text>
            <div className={styles.messageInfo}>
              <Text variant='caption'>12:00</Text>
            </div>
          </div>
          <div className={clsx(styles.message, styles.myMessage)}>
            <Text variant='text1'>I'm fine, thanks! And you?</Text>
            <div className={styles.messageInfo}>
              <Text variant='caption'>12:01</Text>
              <CheckCheck width={14} height={14} />
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <Paperclip className={styles.icons} />
          <TextInput
            className={styles.input}
            placeholder='Write a message...'
            label='Write a message...'
            hideLabel
            noBorder
          />
          <Smile className={styles.icons} />
          <Send className={styles.icons} />
        </div>
      </div>
    </PageLayout>
  );
};
