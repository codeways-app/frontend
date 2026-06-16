import { Search, EllipsisVertical } from 'lucide-react';

import { Link } from '@/shared/configs/i18n/lib';
import { Avatar } from '@/shared/components/Avatar';
import { Text } from '@/shared/components/Text';

import { ChatHeaderProps } from '../types';

import clsx from 'clsx';

import styles from './ChatHeader.module.css';

export const ChatHeader = ({ title, additionalInfo, profileLogin, isLoading }: ChatHeaderProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.main}>
        {isLoading ? (
          <>
            <div className={clsx(styles.skeleton, styles.skeleton_avatar)}></div>
            <div className={styles.info}>
              <div className={clsx(styles.skeleton, styles.skeleton_title)}></div>
              <div className={clsx(styles.skeleton, styles.skeleton_info)}></div>
            </div>
          </>
        ) : (
          <>
            <Avatar name={title} size='md' href={profileLogin ? `/${profileLogin}` : undefined} />
            <div className={styles.info}>
              {profileLogin ? (
                <Link href={`/${profileLogin}`} className={styles.titleLink}>
                  <Text variant='text1'>{title}</Text>
                </Link>
              ) : (
                <Text variant='text1'>{title}</Text>
              )}
              <Text variant='caption'>{additionalInfo}</Text>
            </div>
          </>
        )}
      </div>
      <div className={styles.tools}>
        <Search />
        <EllipsisVertical />
      </div>
    </div>
  );
};
