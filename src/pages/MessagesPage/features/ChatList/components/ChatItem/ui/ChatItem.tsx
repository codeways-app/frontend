import { useTranslations, useLocale } from 'next-intl';
import { Check, CheckCheck } from 'lucide-react';

import { Avatar } from '@/shared/components/Avatar';
import { Text } from '@/shared/components/Text';

import { formatDateOrTime } from '@/shared/lib/date';
import { useAuthUser } from '@/shared/stores/app/hooks';

import { ChatItemProps } from '../types';

import clsx from 'clsx';

import styles from './ChatItem.module.css';

export const ChatItem = ({ chat, isActive, onClick, isCollapsed }: ChatItemProps) => {
  const user = useAuthUser();
  const t = useTranslations('messages.chatsList');
  const locale = useLocale();

  return (
    <li
      className={clsx(styles.chat, isActive && styles.active, isCollapsed && styles.collapsed)}
      onClick={onClick}
    >
      <div className={styles.main}>
        <Avatar name={chat.title} size='md' />
        {!isCollapsed && (
          <div className={styles.content}>
            <Text variant='text1' className={styles.title}>{chat.title}</Text>
            {chat.lastMessage && (
              <Text variant='text2' className={styles.lastMessage}>
                {chat.lastMessage.content}
              </Text>
            )}
          </div>
        )}
      </div>
      {!isCollapsed && (
        <div className={styles.info}>
          <div className={styles.lastMessageInfo}>
            {chat.lastMessage?.sender.id === user?.id &&
              chat.lastMessage?.status === 'DELIVERED' && (
                <Check
                  width={14}
                  height={14}
                  className={clsx(styles.check, isActive && styles.white)}
                />
              )}
            {chat.lastMessage?.sender.id === user?.id && chat.lastMessage?.status === 'READ' && (
              <CheckCheck width={14} height={14} className={styles.check} />
            )}
            {chat.lastMessage && (
              <Text variant='caption'>
                {formatDateOrTime(chat.lastMessage.createdAt, locale, t)}
              </Text>
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
      )}
    </li>
  );
};
