import { useTranslations } from 'next-intl';

import { Text } from '@/shared/components/Text';
import { useAuthUser } from '@/shared/stores/app/hooks';

import { isGroupChat } from '@/pages/MessagesPage/lib';

import { ChatHeader } from '../components/ChatHeader';
import { ChatMessageList } from '../components/ChatMessageList';
import { ChatFooter } from '../components/ChatFooter';

import { useChatForm } from '../hooks';
import { ChatProps } from '../types';

import styles from './Chat.module.css';

export const Chat = ({
  selectedChat,
  query,
  targetMessageId,
  targetMessageToken,
  onMessageScrolled,
}: ChatProps) => {
  const t = useTranslations('messages.chat');
  const user = useAuthUser();

  const { register, onSubmit, onFileSelect, onEmojiSelect } = useChatForm({ selectedChat, user });

  if (!selectedChat)
    return (
      <div className={styles.select}>
        <div className={styles.card}>
          <Text variant='title2'>{t('selectChat')}</Text>
          <Text>{t('selectChatDescription')}</Text>
        </div>
      </div>
    );

  const isGroup = isGroupChat(query.data?.participantsCount ?? 0);

  return (
    <div className={styles.chat}>
      <ChatHeader
        title={query.data?.title}
        additionalInfo={
          !isGroup
            ? query.data?.additionalInfo
            : t('header.participants', { count: query.data?.participantsCount ?? 0 })
        }
        profileLogin={query.data?.profileLogin}
        isLoading={query.isLoading}
      />
      <ChatMessageList
        messages={query.data?.messages || []}
        user={user}
        selectedChat={selectedChat}
        isGroup={isGroup}
        targetMessageId={targetMessageId}
        targetMessageToken={targetMessageToken}
        onMessageScrolled={onMessageScrolled}
      />
      <ChatFooter
        register={register}
        onSubmit={onSubmit}
        onFileSelect={onFileSelect}
        onEmojiSelect={onEmojiSelect}
        placeholder={t('textInput.placeholder')}
      />
    </div>
  );
};
