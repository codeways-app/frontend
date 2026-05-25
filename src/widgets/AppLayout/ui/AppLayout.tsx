import { FC } from 'react';

import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';

import { AppLayoutProps } from '../types';

import clsx from 'clsx';

import styles from './AppLayout.module.css';

export const AppLayout: FC<AppLayoutProps> = ({ className, children }) => {
  const classes = clsx(styles.main, className);

  return (
    <div className={styles.page}>
      <Header />
      <main className={classes}>{children}</main>
      <Footer />
    </div>
  );
};
