import { Button } from '@/shared/components/Button';

import styles from './AdministatorSidebar.module.css';
import { MessageCircle, Quote, UserIcon, UsersIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const AdministatorSidebar = () => {
  const t = useTranslations('admin.sidebar');

  return (
    <nav className={styles.menu}>
      <ul className={styles.list}>
        <li className={styles.link}>
          <Button as='Link' href={'./users'} iconSide='start' icon={<UserIcon />}>
            {t('users')}
          </Button>
        </li>
        <span className={styles.divider}></span>
        <li className={styles.link}>
          <Button as='Link' href={'./companies'} iconSide='start' icon={<UsersIcon />}>
            {t('companies')}
          </Button>
        </li>
        <span className={styles.divider}></span>
        <li className={styles.link}>
          <Button as='Link' href={'./messages'} iconSide='start' icon={<MessageCircle />}>
            {t('messages')}
          </Button>
        </li>
        <span className={styles.divider}></span>
        <li className={styles.link}>
          <Button as='Link' href={'./employees'} iconSide='start' icon={<Quote />}>
            {t('employees')}
          </Button>
        </li>
      </ul>
    </nav>
  );
};
