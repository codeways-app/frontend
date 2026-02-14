'use client';

import { FC } from 'react';

import { FadeLayout } from '@/shared/components/FadeLayout';
import { Text } from '@/shared/components/Text';

import { AuthHeader } from '../components/AuthHeader';
import { AuthSocials } from '../components/AuthSocials';
import { AuthAgreement } from '../components/AuthAgreement';

import { DEFAULT_OAUTH_VALUE, DEFAULT_FADE_VALUE } from '../constants';
import { AuthLayoutProps } from '../types';

import styles from './AuthCard.module.css';

export const AuthCard: FC<AuthLayoutProps> = ({
  title,
  oauth = DEFAULT_OAUTH_VALUE,
  fade = DEFAULT_FADE_VALUE,
  children,
}) => {
  const content = (
    <div className={styles.layout}>
      <AuthHeader />
      <div className={styles.card}>
        <div className={styles.content}>
          <Text variant='title1' className={styles.title}>
            {title}
          </Text>
          {oauth && <AuthSocials />}
          {children}
        </div>
      </div>
      <AuthAgreement />
    </div>
  );

  if (fade) {
    return (
      <FadeLayout
        key={fade.toString()}
        blur={true}
        duration={1000}
        easing='ease-out'
        initialOpacity={0}
      >
        {content}
      </FadeLayout>
    );
  }

  return content;
};
