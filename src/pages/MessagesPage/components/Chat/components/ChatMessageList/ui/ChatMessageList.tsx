import { Check, CheckCheck, Loader } from 'lucide-react';

import { Text } from '@/shared/components/Text';
import { formatChatMessageDate } from '@/shared/lib/date';

import { ChatMessageListProps } from '../types';

import clsx from 'clsx';

import styles from './ChatMessageList.module.css';

export const ChatMessageList = ({ messages, user, messagesEndRef }: ChatMessageListProps) => {
  return (
    <div className={styles.content}>
      {[...messages].reverse().map((message) => (
        <div
          key={message.id}
          className={clsx(
            styles.message,
            user?.isAuthenticated && message.sender.id === user.id
              ? styles.myMessage
              : styles.incomingMessage,
          )}
        >
          <Text variant='text1'>{message.content}</Text>
          <div className={styles.messageInfo}>
            <Text variant='caption'>{formatChatMessageDate(message.createdAt)}</Text>
            {user?.isAuthenticated &&
              message.sender.id === user.id &&
              message.status === 'DELIVERED' && (
                <Check width={14} height={14} className={styles.icon} />
              )}
            {user?.isAuthenticated &&
              message.sender.id === user.id &&
              message.status === 'READ' && (
                <CheckCheck width={14} height={14} className={styles.icon} />
              )}
            {user?.isAuthenticated &&
              message.sender.id === user.id &&
              message.status === 'SENT' && <Loader aria-hidden className={styles.spinner} />}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
