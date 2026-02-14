import Link from 'next/link';
import Image from 'next/image';
import { FC } from 'react';

import { BRAND, ROUTES } from '@/shared/constants';
import { Text } from '@/shared/components/Text';

import styles from '../ui/AuthCard.module.css';

export const AuthHeader: FC = () => {
  return (
    <div className={styles.header}>
      <Link href={ROUTES.home.main()} className={styles.logo}>
        <Image width={64} height={26} src='/logo.png' alt={BRAND} className={styles.img} />
        <Text variant='title3' weight={600} className={styles.brand}>
          {BRAND}
        </Text>
      </Link>
    </div>
  );
};
