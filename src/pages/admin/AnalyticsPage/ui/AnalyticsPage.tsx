'use client';

import { AppLayout } from '@/widgets/AppLayout';

import { AnalyticsHeader } from '../components/AnalyticsHeader';
import { AdministatorSidebar } from '../components/AdministatorSidebar';

import styles from './AnalyticsPage.module.css';

export const AnalyticsPage = () => {
  return (
    <AppLayout className={styles.layout}>
      <AdministatorSidebar />
      <AnalyticsHeader />
    </AppLayout>
  );
};
