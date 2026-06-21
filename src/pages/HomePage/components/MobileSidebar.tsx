'use client';

import { MenuIcon, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

import { Button } from '@/shared/components/Button';
import { useClickOutside } from '@/shared/hooks';

import clsx from 'clsx';
import Image from 'next/image';

import styles from './MobileSidebar.module.css';

export const MobileSidebar = () => {
  const t = useTranslations('translation');

  const [active, setActive] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const onClick = () => setActive(!active);
  const onClose = () => setActive(false);

  useClickOutside(navRef, onClose);

  return (
    <div className={styles.sidebar}>
      <Button variant='transparentWhite' onClick={onClick}>
        <MenuIcon />
      </Button>
      <div ref={navRef} className={clsx(styles.navMenu, active && styles.open)}>
        <div className={styles.label}>
          <Image src='/logo.png' alt='logo' width={32} height={32} className={styles.logo} />
          <Button onClick={onClick} className={styles.close}>
            <X width={24} />
          </Button>
        </div>
        <nav>
          <ul>
            <li className={styles.link}>
              <Button as='Link' href={'./products'}>
                {t('home.nav.products')}
              </Button>
            </li>
            <li className={styles.divider} aria-hidden="true"></li>
            <li className={styles.link}>
              <Button as='Link' href={'./services'}>
                {t('home.nav.services')}
              </Button>
            </li>
            <li className={styles.divider} aria-hidden="true"></li>
            <li className={styles.link}>
              <Button as='Link' href={'./work'}>
                {t('home.nav.work')}
              </Button>
            </li>
            <li className={styles.divider} aria-hidden="true"></li>
            <li className={styles.link}>
              <Button as='Link' href={'./company'}>
                {t('home.nav.company')}
              </Button>
            </li>
            <li>
              <div className={styles.join}>
                <Button as='Link' fullWidth variant='primary' href={'./sign-up'}>
                  {t('home.auth.start')}
                </Button>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
