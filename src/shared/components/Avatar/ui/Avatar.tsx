import clsx from 'clsx';
import { CSSProperties } from 'react';

import { getAvatarColor } from '../actions';
import { AvatarProps } from '../types';

import styles from './Avatar.module.css';

export const Avatar = ({ as, src, name, size = 'md', className }: AvatarProps) => {
  const showImage = src;
  const letter = name ? name.trim()[0].toUpperCase() : '?';
  const backgroundColor = getAvatarColor(name);

  const content = showImage ? (
    <img src={src} alt={name ?? 'avatar'} className={styles.image} />
  ) : (
    <span className={styles.fallback}>{letter}</span>
  );

  if (as === 'profile') {
    return (
      <button
        className={clsx(styles.avatar, styles.profile, styles[size], className)}
        aria-label={name}
        style={{ '--avatar-bg': backgroundColor } as CSSProperties}
      >
        {content}
      </button>
    );
  }

  return (
    <div
      className={clsx(styles.avatar, styles[size], className)}
      aria-label={name}
      style={{ '--avatar-bg': backgroundColor } as CSSProperties}
    >
      {content}
    </div>
  );
};
