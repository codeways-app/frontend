'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { setAuth } from '@/shared/stores/app';
import { BRAND } from '@/shared/constants';
import { publicApi } from '@/shared/api';

import { Button } from '@/shared/components/Button';
import { Text } from '@/shared/components/Text';

import GoogleImg from '@/shared/assets/icons/google.png';
import YandexImg from '@/shared/assets/icons/yandex.png';

import { DEFAULT_OAUTH_VALUE, POPUP_HEIGHT, POPUP_WIDTH } from '../constants';
import { AuthLayoutProps, ProviderTypes } from '../types';

import styles from './AuthCard.module.css';

export const AuthCard: FC<AuthLayoutProps> = ({ title, oauth = DEFAULT_OAUTH_VALUE, children }) => {
  const t = useTranslations('translation');

  const router = useRouter();

  const createOAuthHandler = (provider: ProviderTypes) => async () => {
    const res = await publicApi.api.authControllerConnect(provider);
    if (!res?.url) return;

    const left = window.screenX + (window.innerWidth - POPUP_WIDTH) / 2;
    const top = window.screenY + (window.innerHeight - POPUP_HEIGHT) / 2;

    const popup = window.open(
      res.url,
      `${provider}Popup`,
      `width=${POPUP_WIDTH},height=${POPUP_HEIGHT},left=${left},top=${top}`,
    );

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      const { accessToken } = event.data;
      if (accessToken) {
        setAuth(accessToken);
        window.removeEventListener('message', handleMessage);
        router.push('/dashboard');
      }
    };

    window.addEventListener('message', handleMessage);

    if (!popup) return;
  };

  const onGoogle = createOAuthHandler('google');
  const onYandex = createOAuthHandler('yandex');

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Link href={'/'} className={styles.logo}>
          <Image width={64} height={26} src='/logo.png' alt={BRAND} className={styles.img} />
          <Text variant='title3' weight={600} className={styles.brand}>
            {BRAND}
          </Text>
        </Link>
      </div>
      <div className={styles.card}>
        <div className={styles.content}>
          <Text variant='title1' className={styles.title}>
            {title}
          </Text>
          {oauth && (
            <>
              <div className={styles.socials}>
                <Button
                  type='button'
                  onClick={onGoogle}
                  icon={<Image src={GoogleImg} alt='Google' width={20} height={20} />}
                  variant='transparentWhite'
                  size='sm'
                  fullWidth
                >
                  <Text>Google</Text>
                </Button>
                <Button
                  type='button'
                  onClick={onYandex}
                  icon={<Image src={YandexImg} alt='Yandex' width={50} height={50} />}
                  variant='transparentWhite'
                  size='sm'
                  fullWidth
                >
                  <Text>Яндекс</Text>
                </Button>
              </div>
              <div className={styles.line}>
                <Text className={styles.or}>{t('auth.text.orContinueWith')}</Text>
              </div>
            </>
          )}
          {children}
        </div>
      </div>
      <Text variant='caption' className={styles.agreement}>
        {t.rich('auth.text.agreement', {
          privacy: (chunks) => (
            <Link href='/privacy-policy'>
              <span className={styles.link}>{chunks}</span>
            </Link>
          ),
          cookie: (chunks) => (
            <Link href='/cookie-policy'>
              <span className={styles.link}>{chunks}</span>
            </Link>
          ),
          terms: (chunks) => (
            <Link href='/project-terms'>
              <span className={styles.link}>{chunks}</span>
            </Link>
          ),
        })}
      </Text>
    </div>
  );
};
