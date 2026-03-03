import { useEffect, useRef } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

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

import { useSendMessage } from '../api';
import { SendMessageForm, sendMessageSchema } from '../model';
import { ChatProps } from '../types';

import clsx from 'clsx';

import styles from './Chat.module.css';

import { addMessageToChat, updateChatMessage, updateChatListCache } from '../actions';

export const Chat = ({ selectedChat, query }: ChatProps) => {
  const t = useTranslations('messages.chat');
  const user = useAuthUser();

  const sendMessageMutation = useSendMessage();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [query.data?.messages, selectedChat]);

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
    if (!selectedChat || !user?.id) return;

    const content = values.message.content;
    const type = values.message.type;

    const tempId = addMessageToChat(selectedChat, {
      content,
      sender: {
        id: user.id,
        login: user.login,
        name: '',
        picture: '',
      },
      type,
      replyToId: values.message.replyToId || '',
    });

    updateChatListCache(selectedChat, {
      id: tempId,
      content,
      sender: {
        id: user.id,
        login: user.login,
        name: '',
        picture: '',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'SENT',
      type,
      replyToId: values.message.replyToId || '',
    });

    sendMessageMutation.mutate(values, {
      onSuccess: (response) => {
        updateChatMessage(selectedChat, tempId, response);
        updateChatListCache(selectedChat, response);
      },
    });

    reset({
      ...values,
      message: {
        ...values.message,
        content: '',
      },
    });
  });

  if (!selectedChat)
    return (
      <div className={styles.select}>
        <div className={styles.card}>
          <Text variant='title2'>{t('selectChat')}</Text>
          <Text>{t('selectChatDescription')}</Text>
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
        {[...(query.data?.messages || [])].reverse().map((message) => (
          <div
            key={message.id}
            className={clsx(
              styles.message,
              message.sender.id === user?.id ? styles.myMessage : styles.incomingMessage,
            )}
          >
            <Text variant='text1'>{message.content}</Text>
            <div className={styles.messageInfo}>
              <Text variant='caption'>{formatChatMessageDate(message.createdAt)}</Text>
              {message.sender.id === user?.id && message.status === 'DELIVERED' && (
                <Check width={14} height={14} className={styles.icon} />
              )}
              {message.sender.id === user?.id && message.status === 'READ' && (
                <CheckCheck width={14} height={14} className={styles.icon} />
              )}
              {message.sender.id === user?.id && message.status === 'SENT' && (
                <Loader aria-hidden className={styles.spinner} />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className={styles.footer} onSubmit={onSubmit}>
        <Button variant='transparent' className={styles.button}>
          <Paperclip />
        </Button>
        <TextInput
          className={styles.input}
          placeholder={t('textInput.placeholder')}
          label={t('textInput.placeholder')}
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
