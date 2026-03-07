import { Avatar } from '@/shared/components/Avatar';
import { Button } from '@/shared/components/Button';
import { Text } from '@/shared/components/Text';
import { useAuthUser } from '@/shared/stores/app/hooks';
import { BRAND, ROUTES } from '@/shared/constants';

import { UserSidebar } from '../components/UserSidebar';

import { BookMarked, MessageCircleMore } from 'lucide-react';

import Image from 'next/image';

import styles from './Header.module.css';

export const Header = () => {
  const user = useAuthUser();

  return (
    <header className={styles.header}>
      <div className={styles.side}>
        <UserSidebar />
        <Button
          as='Link'
          aria-label='Logo'
          href={ROUTES.home.main()}
          icon={<Image src='/logo.png' alt='logo' width={24} height={24} />}
        >
          <Text variant='title5' weight={700} as='span' className={styles.brand}>
            {BRAND}
          </Text>
        </Button>
      </div>
      <div className={styles.side}>
        <Button variant='transparentWhite' aria-label='Daily challenges' icon={<BookMarked />} />
        <Button
          as='Link'
          aria-label='Messages'
          href={ROUTES.messages.main()}
          variant='transparentWhite'
          icon={<MessageCircleMore />}
        />
        <Avatar as='profile' name={user?.login} size='sm' />
      </div>
    </header>
  );
};
