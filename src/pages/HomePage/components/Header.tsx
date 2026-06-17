import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/Button';
import { Text } from '@/shared/components/Text';
import { BRAND, ROUTES } from '@/shared/constants';

import { MobileSidebar } from './MobileSidebar';

import Image from 'next/image';
import Link from 'next/link';

import styles from './Header.module.css';

export const Header = () => {
  const t = useTranslations('home');
  return (
    <header className={styles.header}>
      <div className={styles.side}>
        <MobileSidebar />
        <Link href='/' className={styles.logo}>
          <Image src='/logo.png' alt='logo' width={32} height={32} className={styles.icon} />
          <Text variant='title2' className={styles.brand}>
            {BRAND}
          </Text>
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <Button as='Link' href='./products' size='md' variant='gray'>
                {t('nav.products')}
              </Button>
            </li>
            <li>
              <Button as='Link' href='./services' size='md' variant='gray'>
                {t('nav.services')}
              </Button>
            </li>
            <li>
              <Button as='Link' href='./work' size='md' variant='gray'>
                {t('nav.work')}
              </Button>
            </li>
            <li>
              <Button as='Link' href='./company' size='md' variant='gray'>
                {t('nav.company')}
              </Button>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.side}>
        <Button as='Link' variant='transparentWhite' size='sm' href={ROUTES.auth.signIn()}>
          {t('auth.signIn')}
        </Button>
        <Button
          as='Link'
          size='sm'
          variant='primary'
          href={ROUTES.auth.signUp()}
          className={styles.join}
        >
          {t('auth.start')}
        </Button>
      </div>
    </header>
  );
};
