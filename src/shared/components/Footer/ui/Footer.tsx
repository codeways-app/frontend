import { FC } from 'react';

import { Text } from '@/shared/components/Text';

import clsx from 'clsx';

import styles from './Footer.module.css';

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={clsx(styles.part, styles.left)} />
      <div className={styles.badge}>
        <Text>Development version 0.0.1</Text>
      </div>
      <div className={clsx(styles.part, styles.right)} />
    </footer>
  );
};
