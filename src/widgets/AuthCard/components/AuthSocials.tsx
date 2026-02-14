'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { setAuth } from '@/shared/stores/app';
import { ROUTES } from '@/shared/constants';
import { publicApi } from '@/shared/api';

import { Button } from '@/shared/components/Button';
import { Text } from '@/shared/components/Text';

import GoogleImg from '@/shared/assets/icons/google.png';
import YandexImg from '@/shared/assets/icons/yandex.png';

import { POPUP_HEIGHT, POPUP_WIDTH } from '../constants';
import { ProviderTypes } from '../types';

import styles from '../ui/AuthCard.module.css';

export const AuthSocials: FC = () => {
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
        router.push(ROUTES.dashboard.main());
      }
    };

    window.addEventListener('message', handleMessage);

    if (!popup) return;
  };

  const onGoogle = createOAuthHandler('google');
  const onYandex = createOAuthHandler('yandex');

  return (
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
  );
};
