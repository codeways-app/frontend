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
        <nav>
          <ul className={styles.nav}>
            <li>
              <Button as='Link' href={'./blog'}>
                {t('button.blog')}
              </Button>
            </li>
            <span className={styles.divider} />
            <li>
              <Button as='Link' href={'./for-educators'}>
                {t('button.forEducators')}
              </Button>
            </li>
            <span className={styles.divider} />
            <li>
              <Button as='Link' href={'./for-companies'}>
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
