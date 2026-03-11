import { Text } from '@/shared/components/Text';

import { SimpleAreaChart } from './SimpleAreaChart';

import styles from './AnalyticsHeader.module.css';
import { useTranslations } from 'next-intl';
import { FullAreaChart } from './FullAreaChart';

const newUsersLast28Days = 131;

export const AnalyticsHeader = () => {
  const t = useTranslations('admin.analytics');

  const lastUsers = {
    title: t('totalUsers'),
    data: [
      { day: 'Mon', count: 12 },
      { day: 'Tue', count: 14 },
      { day: 'Wed', count: 18 },
      { day: 'Thu', count: 21 },
      { day: 'Fri', count: 24 },
      { day: 'Sat', count: 22 },
      { day: 'Sun', count: 20 },
    ],
  };

  const totalUsersData = Array.from({ length: 28 }, (_, i) => ({
    day: (i + 1).toString(),
    count: Math.floor(Math.sin(i * 0.5) * 10 + 20),
  }));

  const totalUsers = {
    title: t('totalUsers'),
    data: totalUsersData,
  };

  const totalCompanies = {
    title: t('totalCompanies'),
    data: [
      { day: 'Mon', count: 12 },
      { day: 'Tue', count: 11 },
      { day: 'Wed', count: 10 },
      { day: 'Thu', count: 9 },
      { day: 'Fri', count: 8 },
      { day: 'Sat', count: 8 },
      { day: 'Sun', count: 7 },
    ],
  };

  const totalJobs = {
    title: t('totalJobs'),
    data: [
      { day: 'Mon', count: 18 },
      { day: 'Tue', count: 20 },
      { day: 'Wed', count: 23 },
      { day: 'Thu', count: 25 },
      { day: 'Fri', count: 27 },
      { day: 'Sat', count: 26 },
      { day: 'Sun', count: 25 },
    ],
  };

  return (
    <div className={styles.layout}>
      <Text variant='title1' style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>
        {t.rich('newUsersJoined', {
          br: () => <br />,
          days: 28,
          count: newUsersLast28Days,
        })}
      </Text>
      <div className={styles.charts}>
        <SimpleAreaChart data={lastUsers} />
        <SimpleAreaChart data={totalCompanies} />
        <SimpleAreaChart data={totalJobs} />
      </div>
      <FullAreaChart data={totalUsers} />
    </div>
  );
};
