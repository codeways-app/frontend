import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Text } from '@/shared/components/Text';

import styles from '../ui/AuthCard.module.css';

export const AuthAgreement: FC = () => {
  const t = useTranslations('translation');

  return (
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
  );
};
