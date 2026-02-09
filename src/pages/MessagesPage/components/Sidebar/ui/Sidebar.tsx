import { Users, Shield, Plus } from 'lucide-react';

import { Button } from '@/shared/components/Button';

import { SidebarProps } from '../types';

import clsx from 'clsx';

import styles from './Sidebar.module.css';

export const Sidebar = ({ activeFolder, setActiveFolder }: SidebarProps) => {
  return (
    <ul className={styles.sidebar}>
      <li className={clsx(styles.folder, activeFolder === 0 && styles.activeFolder)}>
        <Button
          variant={activeFolder === 0 ? 'white' : 'gray'}
          fullWidth
          vertical
          size='xxs'
          icon={<Users />}
          onClick={() => setActiveFolder(0)}
        >
          All chats
        </Button>
      </li>
      <li className={clsx(styles.folder, activeFolder === 1 && styles.activeFolder)}>
        <Button
          icon={<Shield />}
          variant={activeFolder === 1 ? 'white' : 'gray'}
          fullWidth
          vertical
          size='xxs'
          onClick={() => setActiveFolder(1)}
        >
          Clan
        </Button>
      </li>
      <li className={clsx(styles.folder, activeFolder === 2 && styles.activeFolder)}>
        <Button
          variant={activeFolder === 2 ? 'white' : 'gray'}
          icon={<Plus />}
          vertical
          size='xxs'
          onClick={() => setActiveFolder(2)}
        >
          Add folder
        </Button>
      </li>
    </ul>
  );
};
