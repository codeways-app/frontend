import { useLocale, useTranslations } from 'next-intl';
import React, { useMemo } from 'react';
import { Check, CheckCheck, Loader, ChevronDown } from 'lucide-react';

import { Avatar } from '@/shared/components/Avatar';
import { Text } from '@/shared/components/Text';
import { formatTime, formatMessageDate } from '@/shared/lib/date';

import { MessageStatus } from '../constants';
import { useChatScroll } from '../hooks';
import { ChatMessageListProps } from '../types';

import clsx from 'clsx';

import styles from './ChatMessageList.module.css';

export const ChatMessageList = ({
  messages,
  user,
  selectedChat,
  isGroup,
}: ChatMessageListProps) => {
  const locale = useLocale();
  const tDate = useTranslations('messages.chatsList.date');

  const { messagesEndRef, showScrollButton, scrollToBottom } = useChatScroll(
    messages,
    selectedChat,
  );

  const groupedMessages = useMemo(() => {
    const groupsMap = new Map<string, typeof messages>();

    messages.forEach((message) => {
      const dateKey = new Date(message.createdAt).toDateString();

      if (!groupsMap.has(dateKey)) {
        groupsMap.set(dateKey, []);
      }
      groupsMap.get(dateKey)!.push(message);
    });

    return Array.from(groupsMap.entries()).map(([dateKey, items]) => ({
      dateKey,
      dateVal: items[0].createdAt,
      items,
    }));
  }, [messages]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div ref={messagesEndRef} />
        {groupedMessages.map((group) => (
          <React.Fragment key={group.dateKey}>
            {group.items.map((message) => {
              const isMyMessage = user?.isAuthenticated && message.sender.id === user.id;

              return (
                <div
                  key={message.id}
                  className={clsx(
                    styles.messageWrapper,
                    isMyMessage ? styles.myWrapper : styles.incomingWrapper,
                  )}
                >
                  {isGroup && (
                    <Avatar
                      name={message.sender.name || message.sender.login || '?'}
                      src={message.sender.avatar}
                      size='sm'
                      className={clsx(styles.avatar, isMyMessage && styles.myAvatar)}
                    />
                  )}
                  <div
                    className={clsx(
                      styles.message,
                      isMyMessage ? styles.myMessage : styles.incomingMessage,
                    )}
                  >
                    <Text variant='text1'>{message.content}</Text>
                    <div className={styles.messageInfo}>
                      <Text variant='caption'>{formatTime(message.createdAt, locale)}</Text>
                      {isMyMessage && message.status === MessageStatus.DELIVERED && (
                        <Check width={14} height={14} className={styles.icon} />
                      )}
                      {isMyMessage && message.status === MessageStatus.READ && (
                        <CheckCheck width={14} height={14} className={styles.icon} />
                      )}
                      {isMyMessage && message.status === MessageStatus.SENT && (
                        <Loader aria-hidden className={styles.spinner} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className={styles.dateHeader}>
              <Text variant='caption' className={styles.dateText}>
                {formatMessageDate(group.dateVal, locale, tDate)}
              </Text>
            </div>
          </React.Fragment>
        ))}
      </div>
      {showScrollButton && (
        <button
          className={styles.scrollDownBtn}
          onClick={() => scrollToBottom('smooth')}
          aria-label='Scroll to bottom'
        >
          <ChevronDown width={12} height={12} className={styles.scrollIcon} />
        </button>
      )}
    </div>
  );
};
