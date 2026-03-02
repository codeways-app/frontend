import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { Button } from '@/shared/components/Button';

import { useAuthUser } from '@/shared/stores/app/hooks';
import { formatChatMessageDate } from '@/shared/lib/date';
import { SendMessageDto } from '@/shared/api';

import { useSendMessage } from '../api';
import { SendMessageForm, sendMessageSchema } from '../model';
import { ChatProps } from '../types';

import clsx from 'clsx';

import styles from './Chat.module.css';

export const Chat = ({ selectedChat, query }: ChatProps) => {
  const user = useAuthUser();

  const sendMessageMutation = useSendMessage();

  const { register, handleSubmit, reset, setValue } = useForm<SendMessageForm>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      chatId: selectedChat || '',
      userId: user?.id || '',
      message: { content: '', type: 'TEXT' },
    },
  });

  useEffect(() => {
    if (selectedChat) setValue('chatId', selectedChat);
    if (user?.id) setValue('userId', user.id);
  }, [selectedChat, user?.id, setValue]);

  const onSubmit = handleSubmit((values) => {
    sendMessageMutation.mutate(values as unknown as SendMessageDto);
    reset({
      ...values,
      message: { content: '' },
    });
  });

  if (!selectedChat)
    return (
      <div className={styles.select}>
        <div className={styles.card}>
          <Text variant='title2'>No chat selected</Text>
          <Text>Please select a chat to start messaging</Text>
        </div>
      </div>
    );

  return (
    <div className={styles.chat}>
      <div className={styles.header}>
        <div className={styles.main}>
          {query.isLoading ? (
            <>
              <div className={clsx(styles.skeleton, styles.skeleton_avatar)}></div>
              <div className={styles.info}>
                <div className={clsx(styles.skeleton, styles.skeleton_title)}></div>
                <div className={clsx(styles.skeleton, styles.skeleton_info)}></div>
              </div>
            </>
          ) : (
            <>
              <Avatar name={query.data?.title} size='md' />
              <div className={styles.info}>
                <Text variant='text1'>{query.data?.title}</Text>
                <Text variant='caption'>{query.data?.additionalInfo}</Text>
              </div>
            </>
          )}
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
              {message.senderId === user?.id &&
                (message.status === 'DELIVERED' || message.status === 'SENT') && (
                  <Check width={14} height={14} className={styles.icon} />
                )}
              {message.senderId === user?.id && message.status === 'READ' && (
                <CheckCheck width={14} height={14} className={styles.icon} />
              )}
              {message.senderId === user?.id &&
                message.status !== 'READ' &&
                message.status !== 'DELIVERED' &&
                message.status !== 'SENT' && <Loader aria-hidden className={styles.spinner} />}
            </div>
          </div>
        ))}
      </div>
      <form className={styles.footer} onSubmit={onSubmit}>
        <Button variant='transparent' className={styles.button}>
          <Paperclip />
        </Button>
        <TextInput
          className={styles.input}
          placeholder='Write a message...'
          label='Write a message...'
          hideLabel
          noBorder
          {...register('message.content')}
        />
        <Button variant='transparent' className={styles.button}>
          <Smile width={24} height={24} />
        </Button>
        <Button type='submit' variant='transparent' className={styles.button}>
          <Send width={24} height={24} />
        </Button>
      </form>
    </div>
  );
};
