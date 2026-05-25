import { useLocale } from 'next-intl';
import { Check, CheckCheck, Loader, ChevronDown } from 'lucide-react';

import { Avatar } from '@/shared/components/Avatar';
import { Text } from '@/shared/components/Text';
import { formatTime } from '@/shared/lib/date';

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

  const { messagesEndRef, showScrollButton, scrollToBottom } = useChatScroll(
    messages,
    selectedChat,
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div ref={messagesEndRef} />
        {messages.map((message) => {
          const isMyMessage = user?.isAuthenticated && message.sender.id === user.id;

          return (
            <div
              key={message.id}
              className={clsx(
                styles.messageWrapper,
                isMyMessage ? styles.myWrapper : styles.incomingWrapper,
              )}
            >
              {!isMyMessage && isGroup && (
                <Avatar
                  name={message.sender.name || message.sender.login || '?'}
                  src={message.sender.avatar}
                  size='sm'
                  className={styles.avatar}
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
