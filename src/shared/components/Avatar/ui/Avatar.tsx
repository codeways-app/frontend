import clsx from 'clsx';
import { CSSProperties } from 'react';

import { Link } from '@/shared/configs/i18n/lib';

import { getAvatarColor } from '../actions';
import { AvatarProps } from '../types';

import styles from './Avatar.module.css';

export const Avatar = ({ as, href, src, name, size = 'md', className }: AvatarProps) => {
  const letter = name ? name.trim()[0].toUpperCase() : '?';
  const backgroundColor = getAvatarColor(name);
  const style = { '--avatar-bg': backgroundColor } as CSSProperties;

  const content = src ? (
    <img src={src} alt={name ?? 'avatar'} className={styles.image} />
  ) : (
    <span className={styles.fallback}>{letter}</span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={clsx(styles.avatar, styles.link, styles[size], className)}
        aria-label={name}
        style={style}
      >
        {content}
      </Link>
    );
  }

  if (as === 'profile') {
    return (
      <button
        className={clsx(styles.avatar, styles.profile, styles[size], className)}
        aria-label={name}
        style={style}
      >
        {content}
      </button>
    );
  }

  return (
    <div
      className={clsx(styles.avatar, styles[size], className)}
      aria-label={name}
      style={style}
    >
      {content}
    </div>
  );
};
