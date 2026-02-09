import { Text } from '@/shared/components/Text';

import styles from './Chat.module.css';
import { TextInput } from '@/shared/components/TextInput';
import clsx from 'clsx';
import { Search, EllipsisVertical, CheckCheck, Paperclip, Smile, Send } from 'lucide-react';
import { ChatProps } from '../types';

export const Chat = ({ chatName, additionalInfo, messages }: ChatProps) => {
  return (
    <div className={styles.chat}>
      <div className={styles.header}>
        <div className={styles.info}>
          <Text variant='text1'>{chatName}</Text>
          <Text variant='caption'>{additionalInfo}</Text>
        </div>
        <div className={styles.tools}>
          <Search />
          <EllipsisVertical />
        </div>
      </div>
      <div className={styles.content}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={clsx(
              styles.message,
              message.senderId === '1' ? styles.incomingMessage : styles.myMessage,
            )}
          >
            <Text variant='text1'>{message.text}</Text>
            <div className={styles.messageInfo}>
              <Text variant='caption'>{message.createdAt}</Text>
              {message.senderId !== '1' && <CheckCheck width={14} height={14} />}
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
