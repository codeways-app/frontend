import clsx from 'clsx';

import { AvatarProps } from '../types';

import styles from './Avatar.module.css';

export const Avatar = ({ src, name, size = 'md', className }: AvatarProps) => {
  const showImage = src;
  const letter = name ? name.trim()[0].toUpperCase() : '?';

  return (
    <div className={clsx(styles.avatar, styles[size], className)} aria-label={name}>
      {showImage ? (
        <img src={src} alt={name ?? 'avatar'} />
      ) : (
        <span className={styles.fallback}>{letter}</span>
      )}
    </div>
  );
};
