'use client';

import { Text } from '@/shared/components/Text';
import { usePathname } from '@/shared/configs/i18n/lib';

import styles from './Breadcrumbs.module.css';

export const Breadcrumbs = () => {
  const pathname = usePathname();
  const breadcrumbs = pathname
    .split('/')
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1));

  return (
    <nav className={styles.nav}>
      <ol className={styles.breadcrumbs}>
        {breadcrumbs.map((crumb) => (
          <li key={crumb}>
            <Text>{crumb}</Text>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
