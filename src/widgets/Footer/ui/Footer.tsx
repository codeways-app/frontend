import { FC } from 'react';
import { useTranslations } from 'next-intl';

import { Text } from '@/shared/components/Text';

import clsx from 'clsx';

import styles from './Footer.module.css';

export const Footer: FC = () => {
  const t = useTranslations('');

  return (
    <footer className={styles.footer}>
      <div className={clsx(styles.part, styles.left)} />
      <div className={styles.badge}>
        <Text>{t('footer.version')} 0.1.1</Text>
      </div>
      <div className={clsx(styles.part, styles.right)} />
    </footer>
  );
};
