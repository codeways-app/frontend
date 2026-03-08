import { useId } from 'react';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Text } from '@/shared/components/Text';

import styles from './FullAreaChart.module.css';
import { useTranslations } from 'next-intl';

export const FullAreaChart = ({
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

  const total = data.data.reduce((acc, item) => acc + Number(item.count || 0), 0);

  return (
    <div className={styles.card}>
      <div className={styles.main}>
        <div>
          <Text variant='title2' color='content2'>
            {data.title}
          </Text>
          <Text variant='title1'>{total.toLocaleString()}</Text>
        </div>
      </div>
      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart data={data.data} margin={{ top: 20, right: 30, left: 30, bottom: 50 }}>
            <defs>
              <linearGradient id={gradientId} x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor='var(--white)' stopOpacity={0.4} />
                <stop offset='100%' stopColor='var(--white)' stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke='var(--border-color-1)' vertical={false} strokeDasharray='3 3' />
            <XAxis
              dataKey='day'
              stroke='var(--white)'
              fontSize={12}
              tick={{ fill: 'var(--white)' }}
              tickLine={{ stroke: 'var(--white)' }}
              axisLine={{ stroke: 'var(--white)' }}
              interval={1}
              label={{
                value: t('days') || 'Days',
                position: 'insideBottom',
                offset: -35,
                fill: 'var(--white)',
                fontSize: 14,
              }}
            />
            <YAxis
              stroke='var(--white)'
              fontSize={12}
              tick={{ fill: 'var(--white)' }}
              tickLine={{ stroke: 'var(--white)' }}
              axisLine={{ stroke: 'var(--white)' }}
              tickFormatter={(value) => `${value}`}
              label={{
                value: t('peopleCount') || 'People',
                angle: -90,
                position: 'insideLeft',
                offset: -10,
                fill: 'var(--white)',
                fontSize: 14,
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--base-300)',
                border: '1px solid var(--border-color-1)',
                borderRadius: '8px',
              }}
              itemStyle={{ color: 'var(--white)' }}
            />
            <Area
              type='linear'
              dataKey='count'
              stroke='var(--white)'
              strokeWidth={3}
              fill={`url(#${gradientId})`}
              activeDot={{ r: 4, strokeWidth: 0 }}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
