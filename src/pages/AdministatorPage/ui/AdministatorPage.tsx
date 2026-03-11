'use client';

import { AppLayout } from '@/widgets/AppLayout';

import { AnalyticsHeader } from '../components/AnalyticsHeader';
import { AdministatorSidebar } from '../components/AdministatorSidebar';

import styles from './AdministatorPage.module.css';

export const AdministatorPage = () => {
  return (
    <AppLayout className={styles.layout}>
      <AdministatorSidebar />
      <AnalyticsHeader />
    </AppLayout>
  );
};
