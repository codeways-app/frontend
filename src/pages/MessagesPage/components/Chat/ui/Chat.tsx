import {
  Search,
  EllipsisVertical,
  CheckCheck,
  Paperclip,
  Smile,
  Send,
  Check,
  Loader,
} from 'lucide-react';

import { Avatar } from '@/shared/components/Avatar';
import { Text } from '@/shared/components/Text';
import { TextInput } from '@/shared/components/TextInput';

import { useAuthUser } from '@/shared/stores/app/hooks';
import { formatChatMessageDate } from '@/shared/lib/date';

import { ChatProps } from '../types';

import clsx from 'clsx';

import styles from './Chat.module.css';

export const Chat = ({ query }: ChatProps) => {
  const user = useAuthUser();

  return (
    <div className={styles.chat}>
      <div className={styles.header}>
        <div className={styles.main}>
          <Avatar name={query.data?.title} size='md' />
          <div className={styles.info}>
            <Text variant='text1'>{query.data?.title}</Text>
            <Text variant='caption'>{query.data?.additionalInfo}</Text>
          </div>
        </div>
        <div className={styles.tools}>
          <Search />
          <EllipsisVertical />
        </div>
      </div>
      <div className={styles.content}>
        {query.data?.messages?.map((message) => (
          <div
            key={message.id}
            className={clsx(
              styles.message,
              message.senderId === user?.id ? styles.myMessage : styles.incomingMessage,
            )}
          >
            <Text variant='text1'>{message.content}</Text>
            <div className={styles.messageInfo}>
              <Text variant='caption'>{formatChatMessageDate(message.createdAt)}</Text>
              {message.senderId === user?.id && message.status === 'DELIVERED' && (
                <Check width={14} height={14} />
              )}
              {message.senderId === user?.id && message.status === 'READ' && (
                <CheckCheck width={14} height={14} />
              )}
              {message.senderId === user?.id && message.status === 'SENT' && (
                <Loader aria-hidden className={styles.spinner} />
              )}
            </div>
          </div>
        ))}
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
  );
};
