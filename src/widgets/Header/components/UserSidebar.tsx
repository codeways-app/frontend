'use client';

import {
  Brain,
  Bug,
  ClipboardList,
  Handshake,
  HatGlasses,
  HomeIcon,
  LibraryBig,
  MenuIcon,
  Shield,
  ShoppingBasket,
  UserRound,
  X,
} from 'lucide-react';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { useClickOutside } from '@/shared/hooks';
import { Button } from '@/shared/components/Button';

import clsx from 'clsx';
import Image from 'next/image';

import styles from './UserSidebar.module.css';

export const UserSidebar = () => {
  const t = useTranslations('translation');

  const [active, setActive] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const onClick = () => setActive(!active);
  const onClose = () => setActive(false);

  useClickOutside(navRef, onClose);

  return (
    <div className={styles.sidebar}>
      <Button variant='transparentWhite' size='xs' className={styles.menuButton} onClick={onClick}>
        <MenuIcon />
      </Button>
      <div ref={navRef} className={clsx(styles.navMenu, active && styles.open)}>
        <div className={styles.label}>
          <Image src='/logo.png' alt='logo' width={32} height={32} className={styles.logoIcon} />
          <Button onClick={onClick} className={styles.close}>
            <X width={24} />
          </Button>
        </div>
        <nav>
          <ul>
            <li>
              <Button as='Link' href='./blog' icon={<HomeIcon />} className={styles.link} fullWidth>
                {t('dashboard.button.home')}
              </Button>
            </li>
            <span className={styles.divider} />
            <li>
              <Button
                as='Link'
                href='./shop'
                icon={<ShoppingBasket />}
                className={styles.link}
                fullWidth
              >
                {t('dashboard.button.shop')}
              </Button>
            </li>
            <li>
              <Button
                as='Link'
                href='./library'
                icon={<LibraryBig />}
                className={styles.link}
                fullWidth
              >
                {t('dashboard.button.library')}
              </Button>
            </li>
            <li>
              <Button as='Link' href='./mentors' icon={<Brain />} className={styles.link} fullWidth>
                {t('dashboard.button.mentors')}
              </Button>
            </li>
            <span className={styles.divider} />
            <li>
              <Button as='Link' href='./problems' icon={<Bug />} className={styles.link} fullWidth>
                {t('dashboard.button.problems')}
              </Button>
            </li>
            <li>
              <Button
                as='Link'
                href='./tests'
                icon={<ClipboardList />}
                className={styles.link}
                fullWidth
              >
                {t('dashboard.button.tests')}
              </Button>
            </li>
            <span className={styles.divider} />
            <li>
              <Button
                as='Link'
                href='./mutualAssistance'
                icon={<Handshake />}
                className={styles.link}
                fullWidth
              >
                {t('dashboard.button.mutualAssistance')}
              </Button>
            </li>
            <li>
              <Button
                as='Link'
                href='./community'
                icon={<UserRound />}
                className={styles.link}
                fullWidth
              >
                {t('dashboard.button.community')}
              </Button>
            </li>
            <li>
              <Button
                as='Link'
                href='./reviews'
                icon={<HatGlasses />}
                className={styles.link}
                fullWidth
              >
                {t('dashboard.button.reviews')}
              </Button>
            </li>
            <li>
              <Button as='Link' href='./clan' icon={<Shield />} className={styles.link} fullWidth>
                {t('dashboard.button.clan')}
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
