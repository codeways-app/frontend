import clsx from 'clsx';
import React from 'react';

import { getAvatarColor } from '../actions';
import { AvatarProps } from '../types';

import styles from './Avatar.module.css';

export const Avatar = ({ src, name, size = 'md', className }: AvatarProps) => {
  const showImage = src;
  const letter = name ? name.trim()[0].toUpperCase() : '?';
  const backgroundColor = getAvatarColor(name);

  return (
    <div
      className={clsx(styles.avatar, styles[size], className)}
      aria-label={name}
      style={{ '--avatar-bg': backgroundColor } as React.CSSProperties}
    >
      {showImage ? (
        <img src={src} alt={name ?? 'avatar'} />
      ) : (
        <span className={styles.fallback}>{letter}</span>
      )}
    </div>
  );
};
