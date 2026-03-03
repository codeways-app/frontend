import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/Button';
import { Text } from '@/shared/components/Text';
import { BRAND, ROUTES } from '@/shared/constants';

import { MobileSidebar } from './MobileSidebar';

import Image from 'next/image';
import Link from 'next/link';

import styles from './Header.module.css';

export const Header = () => {
  const t = useTranslations('translation.home');
  return (
    <header className={styles.header}>
      <div className={styles.side}>
        <MobileSidebar />
        <Link href={ROUTES.home.main()} className={styles.logo}>
          <Image src='/logo.png' alt='logo' width={32} height={32} className={styles.icon} />
          <Text variant='title2' className={styles.brand}>
            {BRAND}
          </Text>
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <Button as='Link' href={'./blog'} size='md'>
                {t('button.blog')}
              </Button>
            </li>
            <li>
              <Button as='Link' href={'./for-educators'} size='md'>
                {t('button.forEducators')}
              </Button>
            </li>
            <li>
              <Button as='Link' href={'./for-companies'} size='md'>
                {t('button.forCompanies')}
              </Button>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.side}>
        <Button as='Link' variant='transparentWhite' href={ROUTES.auth.signIn()} size='sm'>
          {t('button.signIn')}
        </Button>
        <Button
          as='Link'
          size='sm'
          variant='primary'
          href={ROUTES.auth.signUp()}
          className={styles.join}
        >
          {t('button.join')}
        </Button>
      </div>
    </header>
  );
};
