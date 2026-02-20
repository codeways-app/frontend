import { Check, CheckCheck, Search } from 'lucide-react';

import { Button } from '@/shared/components/Button';
import { TextInput } from '@/shared/components/TextInput';
import { Text } from '@/shared/components/Text';

import { formatChatMessageDate } from '@/shared/lib/date';

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
    <div className={styles.list}>
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
        {chats?.map((chat) => (
          <li
            key={chat.id}
            className={clsx(styles.chat, chat.id === activeChat && styles.active)}
            onClick={() => setActiveChat(chat.id)}
          >
            <div className={styles.main}>
              <div className={styles.avatar}></div>
              <div className={styles.content}>
                <Text variant='text1'>{chat.title}</Text>
                <Text variant='text2' className={styles.lastMessage}>
                  {chat.lastMessage.content}
                </Text>
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.lastMessageInfo}>
                {chat.lastMessage.senderId === '0' && chat.lastMessage.status === 'DELIVERED' && (
                  <Check width={14} height={14} className={styles.check} />
                )}
                {chat.lastMessage.senderId === '0' && chat.lastMessage.status === 'READ' && (
                  <CheckCheck width={14} height={14} className={styles.check} />
                )}
                <Text variant='caption'>{formatChatMessageDate(chat.lastMessage.createdAt)}</Text>
              </div>
              {chat.unreadCount > 0 && (
                <div className={styles.unreadCount}>
                  <Text variant='caption'>{chat.unreadCount}</Text>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
