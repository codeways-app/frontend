import { useTranslations } from 'next-intl';

import { Check, CheckCheck, Search } from 'lucide-react';

import { Avatar } from '@/shared/components/Avatar';
import { Button } from '@/shared/components/Button';
import { TextInput } from '@/shared/components/TextInput';
import { Text } from '@/shared/components/Text';

import { formatChatMessageDate } from '@/shared/lib/date';
import { useAuthUser } from '@/shared/stores/app/hooks';

import { ChatListProps } from '../types';
import { useChatListFilters } from '../hooks';

import clsx from 'clsx';

import styles from './ChatsList.module.css';

export const ChatsList = ({
  query,
  selectedChat,
  onChatSelect,
  filter,
  onFilterChange,
}: ChatListProps) => {
  const user = useAuthUser();
  const t = useTranslations('messages.chatsList');

  const filters = useChatListFilters(onFilterChange);

  const handleChatClick = (chatId: string) => () => {
    onChatSelect(chatId);
  };

  return (
    <div className={styles.list}>
      <div className={styles.searchWrapper}>
        <TextInput
          className={styles.search}
          inputSize='sm'
          placeholder={t('textInput.placeholder')}
          label={t('textInput.placeholder')}
          hideLabel
          noBorder
          endIcon={<Search />}
        />
        <ul className={styles.filters}>
          {filters.map((item) => (
            <li key={item.key}>
              <Button
                size='xs'
                variant={filter === item.key ? 'primary' : 'transparentWhite'}
                onClick={item.handler}
              >
                {item.label}
              </Button>
            </li>
          ))}
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
                {chat.lastMessage && (
                  <Text variant='text2' className={styles.lastMessage}>
                    {chat.lastMessage.content}
                  </Text>
                )}
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.lastMessageInfo}>
                {chat.lastMessage?.sender.id === user?.id &&
                  chat.lastMessage?.status === 'DELIVERED' && (
                    <Check width={14} height={14} className={styles.check} />
                  )}
                {chat.lastMessage?.sender.id === user?.id &&
                  chat.lastMessage?.status === 'READ' && (
                    <CheckCheck width={14} height={14} className={styles.check} />
                  )}
                {chat.lastMessage && (
                  <Text variant='caption'>{formatChatMessageDate(chat.lastMessage.createdAt)}</Text>
                )}
              </div>
              {(chat.unreadCount ?? 0) > 0 && (
                <div className={styles.unreadCount}>
                  <Text variant='caption'>
                    {(chat.unreadCount ?? 0) > 99 ? '99+' : chat.unreadCount}
                  </Text>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
