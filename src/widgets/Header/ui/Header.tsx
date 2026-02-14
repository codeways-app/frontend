import { Button } from '@/shared/components/Button';
import { Text } from '@/shared/components/Text';
import { BRAND, ROUTES } from '@/shared/constants';

import { UserSidebar } from '../components/UserSidebar';

import { BookMarked, MessageCircleMore } from 'lucide-react';

import Link from 'next/link';
import Image from 'next/image';

import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.side}>
        <UserSidebar />
        <Link href={ROUTES.home.main()} className={styles.logo}>
          <Image src='/logo.png' alt='logo' width={32} height={32} className={styles.icon} />
          <Text variant='title5' weight={700}>
            {BRAND}
          </Text>
        </Link>
      </div>
      <div className={styles.side}>
        <Button variant='transparentWhite' size='xs' className={styles.link}>
          <BookMarked />
        </Button>
        <Button
          as='Link'
          href={ROUTES.messages.main()}
          variant='transparentWhite'
          size='xs'
          className={styles.link}
        >
          <MessageCircleMore />
        </Button>
        <Button variant='transparentWhite' size='xs' className={styles.account}></Button>
      </div>
    </header>
  );
};
