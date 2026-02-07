'use client';

import { Text } from '@/shared/components/Text';

import styles from './MessagesPage.module.css';
import { EllipsisVertical, Plus, PlusIcon, Search, Send, Shield, Smile, Users } from 'lucide-react';
import { PageLayout } from '@/shared/components/PageLayout';
import clsx from 'clsx';
import { TextInput } from '@/shared/components/TextInput';

const chats = [
  {
    id: 1,
    name: 'username',
    message: 'last_message',
  },
];

chats.push(...Array.from({ length: 40 }, (_, i) => ({ ...chats[0], id: i + 2 })));

export const MessagesPage = () => {
  return (
    <PageLayout className={styles.main}>
      <div className={styles.sidebar}>
        <div className={styles.folder}>
          <Users className={styles.icon} />
          <Text variant='caption'>All chats</Text>
        </div>
        <div className={styles.folder}>
          <Shield className={styles.icon} />
          <Text variant='caption'>Clan</Text>
        </div>
        <div className={styles.folder}>
          <Plus className={styles.icon} />
          <Text variant='caption'>Add folder</Text>
        </div>
      </div>
      <div className={styles.chatsList}>
        <div className={styles.searchWrapper}>
          <TextInput
            className={styles.search}
            placeholder='Search...'
            label='Search...'
            hideLabel
            noBorder
            endIcon={<Search />}
          />
          <ul className={styles.filters}>
            <li className={clsx(styles.filter, styles.active)}>All</li>
            <li className={styles.filter}>Unread</li>
            <li className={styles.filter}>Groups</li>
          </ul>
        </div>
        <ul className={styles.chats}>
          {chats.map((chat) => (
            <li key={chat.id} className={styles.miniChat}>
              <div className={styles.avatar}></div>
              <div>
                <Text variant='text1'>{chat.name}</Text>
                <Text variant='text2'>{chat.message}</Text>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.chat}>
        <div className={styles.header}>
          <div className={styles.info}>
            <Text variant='text1'>Chat name</Text>
            <Text variant='caption'>Addition info</Text>
          </div>
          <div className={styles.tools}>
            <Search />
            <EllipsisVertical />
          </div>
        </div>
        <div className={styles.content}>chat</div>
        <div className={styles.footer}>
          <PlusIcon className={styles.icons} />
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
    </PageLayout>
  );
};
