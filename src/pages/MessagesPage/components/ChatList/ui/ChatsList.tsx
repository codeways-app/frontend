import { Search } from 'lucide-react';

import { Button } from '@/shared/components/Button';
import { TextInput } from '@/shared/components/TextInput';
import { Text } from '@/shared/components/Text';

import { ChatListProps } from '../types';

import clsx from 'clsx';

import styles from './ChatsList.module.css';

export const ChatsList = ({
  chats,
  activeChat,
  setActiveChat,
  activeFilter,
  setActiveFilter,
}: ChatListProps) => {
  return (
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
              size='xs'
              variant={activeFilter === 'all' ? 'primary' : 'transparentWhite'}
              onClick={() => setActiveFilter('all')}
            >
              All
            </Button>
          </li>
          <li>
            <Button
              size='xs'
              variant={activeFilter === 'unread' ? 'primary' : 'transparentWhite'}
              onClick={() => setActiveFilter('unread')}
            >
              Unread
            </Button>
          </li>
          <li>
            <Button
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
              <Text variant='text2'>{chat.lastMessage}</Text>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
