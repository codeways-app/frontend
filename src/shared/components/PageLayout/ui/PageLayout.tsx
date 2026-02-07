import { FC } from 'react';

import { Footer } from '@/shared/components/Footer';

import { Breadcrumbs } from '@/widgets/Breadcrumbs';
import { UserHeader } from '@/widgets/Header/UserHeader';

import { PageLayoutProps } from '../types';

import clsx from 'clsx';

import styles from './PageLayout.module.css';

export const PageLayout: FC<PageLayoutProps> = ({ className, children }) => {
  const classes = clsx(styles.main, className);

  return (
    <div className={styles.page}>
      <UserHeader>
        <Breadcrumbs />
      </UserHeader>
      <main className={classes}>{children}</main>
      <Footer />
    </div>
  );
};
