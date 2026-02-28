import { Check, CheckCheck, Search } from 'lucide-react';

import { Button } from '@/shared/components/Button';
import { TextInput } from '@/shared/components/TextInput';
import { Text } from '@/shared/components/Text';

import { formatChatMessageDate } from '@/shared/lib/date';
import { useAuthUser } from '@/shared/stores/app/hooks';

import { ChatListProps } from '../types';

import clsx from 'clsx';

import styles from './ChatsList.module.css';
import { Avatar } from '@/shared/components/Avatar';

export const ChatsList = ({
  query,
  selectedChat,
  onChatSelect,
  filter,
  onFilterChange,
}: ChatListProps) => {
  const user = useAuthUser();

  const handleFilterAll = () => onFilterChange('all');
  const handleFilterUnread = () => onFilterChange('unread');
  const handleFilterGroups = () => onFilterChange('groups');

  const handleChatClick = (chatId: string) => () => {
    onChatSelect(chatId);
  };

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
              variant={filter === 'all' ? 'primary' : 'transparentWhite'}
              onClick={handleFilterAll}
            >
              All
            </Button>
          </li>
          <li>
            <Button
              size='xs'
              variant={filter === 'unread' ? 'primary' : 'transparentWhite'}
              onClick={handleFilterUnread}
            >
              Unread
            </Button>
          </li>
          <li>
            <Button
              size='xs'
              variant={filter === 'groups' ? 'primary' : 'transparentWhite'}
              onClick={handleFilterGroups}
            >
              Groups
            </Button>
          </li>
        </ul>
      </div>
      <ul className={styles.chats}>
        {query.isLoading &&
          Array.from({ length: 8 }).map((_, i) => (
            <li className={styles.chat} key={i}>
              <div className={styles.skeleton_main}>
                <div className={clsx(styles.skeleton, styles.skeleton_avatar)}></div>
                <div className={styles.content}>
                  <div className={styles.skeleton_header}>
                    <div className={clsx(styles.skeleton, styles.skeleton_title)}></div>
                    <div className={clsx(styles.skeleton, styles.skeleton_date)}></div>
                  </div>
                  <div className={clsx(styles.skeleton, styles.skeleton_content)}></div>
                </div>
              </div>
            </li>
          ))}
        {query.data?.map((chat) => (
          <li
            key={chat.id}
            className={clsx(styles.chat, chat.id === selectedChat && styles.active)}
            onClick={handleChatClick(chat.id)}
          >
            <div className={styles.main}>
              <Avatar name={chat.title} size='sm' />
              <div className={styles.content}>
                <Text variant='text1'>{chat.title}</Text>
                <Text variant='text2' className={styles.lastMessage}>
                  {chat.lastMessage.content}
                </Text>
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.lastMessageInfo}>
                {chat.lastMessage.senderId === user?.id &&
                  chat.lastMessage.status === 'DELIVERED' && (
                    <Check width={14} height={14} className={styles.check} />
                  )}
                {chat.lastMessage.senderId === user?.id && chat.lastMessage.status === 'READ' && (
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
