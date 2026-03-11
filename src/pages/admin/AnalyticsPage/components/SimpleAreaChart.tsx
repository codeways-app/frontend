import { useId } from 'react';
import { AreaChart, Area } from 'recharts';
import { Text } from '@/shared/components/Text';

import styles from './SimpleAreaChart.module.css';
import { ArrowDown, ArrowUp } from 'lucide-react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

const variantColors = {
  red: 'var(--red-500)',
  green: 'var(--green-500)',
  primary: 'var(--primary)',
} as const;

export const SimpleAreaChart = ({
  data,
}: {
  data: {
    title: string;
    data: Record<string, number | string>[];
  };
}) => {
  const id = useId();
  const gradientId = `gradient-${id}`;
  const t = useTranslations('admin.analytics');

  const lastValue = Number(data.data[data.data.length - 1]?.count || 0);
  const firstValue = Number(data.data[0]?.count || 0);
  const isPositive = lastValue >= firstValue;

  const color = variantColors[isPositive ? 'green' : 'red'];

  const total = data.data.reduce((acc, item) => acc + Number(item.count || 0), 0);
  const percentage = (
    firstValue !== 0 ? Math.abs(((lastValue - firstValue) / firstValue) * 100) : 0
  ).toFixed(0);

  const Icon = isPositive ? ArrowUp : ArrowDown;

  return (
    <div className={styles.card}>
      <div className={styles.main}>
        <Text variant='title2'>{data.title}</Text>
        <Text variant='title1'>{total.toLocaleString()}</Text>
        <div className={styles.badge}>
          <Icon className={clsx(styles.icon, styles[isPositive ? 'green' : 'red'])} />
          <Text variant='title4'>{percentage}% </Text>
          <Text variant='text1'>{t('viaLastWeek')}</Text>
        </div>
      </div>
      <AreaChart
        width={160}
        height={120}
        data={data.data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id={gradientId} x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor={color} stopOpacity={0.8} />
            <stop offset='100%' stopColor='var(--black)' stopOpacity={0.15} />
          </linearGradient>
        </defs>
        <Area
          type='linear'
          dataKey='count'
          stroke={color}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
          activeDot={false}
          dot={false}
        />
      </AreaChart>
    </div>
  );
};
