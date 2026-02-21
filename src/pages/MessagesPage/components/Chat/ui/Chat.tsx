import { Search, EllipsisVertical, CheckCheck, Paperclip, Smile, Send, Check } from 'lucide-react';

import { useAuthUser } from '@/shared/stores/app/hooks';
import { formatChatMessageDate } from '@/shared/lib/date';
import { Text } from '@/shared/components/Text';
import { TextInput } from '@/shared/components/TextInput';

import clsx from 'clsx';

import styles from './Chat.module.css';
import { ChatDto } from '@/shared/api';

export const Chat = ({ title, additionalInfo, messages }: ChatDto) => {
  const user = useAuthUser();

  return (
    <div className={styles.chat}>
      <div className={styles.header}>
        <div className={styles.info}>
          <Text variant='text1'>{title}</Text>
          <Text variant='caption'>{additionalInfo}</Text>
        </div>
        <div className={styles.tools}>
          <Search />
          <EllipsisVertical />
        </div>
      </div>
      <div className={styles.content}>
        {messages?.map((message) => (
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
              {message.senderId === '0' && message.status === 'DELIVERED' && (
                <Check width={14} height={14} />
              )}
              {message.senderId === '0' && message.status === 'READ' && (
                <CheckCheck width={14} height={14} />
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
