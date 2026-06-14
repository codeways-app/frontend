import React from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { formatTime, formatMessageDate } from '@/shared/lib/date';
import { Avatar } from '@/shared/components/Avatar';
import { Text } from '@/shared/components/Text';

import { FileAttachment } from '../components/FileAttachment';
import { MessageStatus } from '../constants';
import { useChatScroll, useGroupedMessages } from '../hooks';
import { ChatMessageListProps } from '../types';

import { Check, CheckCheck, Loader, ChevronDown } from 'lucide-react';

import clsx from 'clsx';

import styles from './ChatMessageList.module.css';

export const ChatMessageList = ({
  messages,
  user,
  selectedChat,
  isGroup,
  targetMessageId,
  targetMessageToken,
  onMessageScrolled,
}: ChatMessageListProps) => {
  const locale = useLocale();
  const tDate = useTranslations('messages.chatsList.date');

  const { messagesEndRef, showScrollButton, scrollToBottom, highlightedMessageId } = useChatScroll(
    messages,
    selectedChat,
    targetMessageId,
    targetMessageToken,
    onMessageScrolled,
  );

  const groupedMessages = useGroupedMessages(messages);

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
                  data-message-id={message.id}
                  className={clsx(
                    styles.messageWrapper,
                    isMyMessage ? styles.myWrapper : styles.incomingWrapper,
                    message.id === highlightedMessageId && styles.highlighted,
                  )}
                >
                  {!message.isCompact && (
                    <Avatar
                      name={message.sender.name || message.sender.login || '?'}
                      src={message.sender.avatar}
                      size='sm'
                      className={clsx(styles.avatar, (!isGroup || isMyMessage) && styles.noAvatar)}
                    />
                  )}
                  <div
                    className={clsx(
                      styles.message,
                      isMyMessage ? styles.myMessage : styles.incomingMessage,
                      message.isCompact && styles.compact,
                      !isGroup && styles.private,
                    )}
                  >
                    {message.type === 'TEXT' ? (
                      <Text variant='text1'>{message.content}</Text>
                    ) : (
                      <FileAttachment
                        type={message.type}
                        fileName={message.fileName || message.content}
                        fileSize={message.fileSize}
                        fileUrl={message.fileUrl}
                        mimeType={message.mimeType}
                      />
                    )}
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
              <Text variant='text2' className={styles.dateText}>
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
