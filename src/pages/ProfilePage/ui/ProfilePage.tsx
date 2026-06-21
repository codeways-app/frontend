'use client';

import { notFound } from 'next/navigation';
import { isAxiosError } from 'axios';

import { Avatar } from '@/shared/components/Avatar';
import { Text } from '@/shared/components/Text';

import { AppLayout } from '@/widgets/AppLayout';

import { useUserProfile } from '../api';
import { ProfilePageProps } from '../types';

import styles from './ProfilePage.module.css';

export const ProfilePage = ({ login }: ProfilePageProps) => {
  const { data: user, error } = useUserProfile(login);

  if (isAxiosError(error) && error.response?.status === 404) {
    notFound();
  }

  const displayName = user?.name || user?.login;

  return (
    <AppLayout>
      <div className={styles.profile}>
        <Avatar src={user?.avatar} name={displayName} size='lg' />
        <Text variant='title4' weight={600} as='h1'>
          {displayName}
        </Text>
      </div>
    </AppLayout>
  );
};
