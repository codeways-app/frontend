import { useTranslations } from 'next-intl';

import { Text } from '@/shared/components/Text';

import { useAuthUser } from '@/shared/stores/app/hooks';

import { ChatHeader } from '../components/ChatHeader';
import { ChatMessageList } from '../components/ChatMessageList';
import { ChatFooter } from '../components/ChatFooter';

import { useChatForm, useChatScroll } from '../hooks';
import { ChatProps } from '../types';

import styles from './Chat.module.css';

export const Chat = ({ selectedChat, query }: ChatProps) => {
  const t = useTranslations('messages.chat');
  const user = useAuthUser();

  const { messagesEndRef } = useChatScroll(query.data?.messages, selectedChat);
  const { register, onSubmit } = useChatForm({ selectedChat, user });

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
      <ChatHeader
        title={query.data?.title}
        additionalInfo={query.data?.additionalInfo}
        isLoading={query.isLoading}
      />
      <ChatMessageList
        messages={query.data?.messages || []}
        user={user}
        messagesEndRef={messagesEndRef}
      />
      <ChatFooter
        register={register}
        onSubmit={onSubmit}
        placeholder={t('textInput.placeholder')}
      />
    </div>
  );
};
