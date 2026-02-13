import { FC } from 'react';

import { Footer } from '@/widgets/Footer';

import { AppLayoutProps } from '../types';

import clsx from 'clsx';

import styles from './PageLayout.module.css';
import { Header } from '@/widgets/Header';

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
