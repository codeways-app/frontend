import type React from 'react';
import Link from 'next/link';

import { clsx } from 'clsx';
import { Loader } from 'lucide-react';

import { Text } from '@/shared/components/Text';

import { DEFAULT_SIZE, DEFAULT_ICON_SIDE, DEFAULT_VARIANT } from '../constants';
import { ButtonProps } from '../types';

import styles from './Button.module.css';

export const Button: React.FC<ButtonProps> = ({
  variant = DEFAULT_VARIANT,
  size = DEFAULT_SIZE,
  icon,
  iconSide = DEFAULT_ICON_SIDE,
  fullWidth,
  vertical,
  className,
  children,
  ...props
}) => {
  const classes = clsx(
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    vertical && styles.vertical,
    className,
  );

  const content = (
    <>
      {icon && iconSide === 'start' && <span className={styles.icon}>{icon}</span>}
      <Text as='span' variant='button' className={styles[`${size}Text`]}>
        {children}
      </Text>
      {icon && iconSide === 'end' && <span className={styles.icon}>{icon}</span>}
    </>
  );

  if (props.as === 'Link') {
    const { as, ...rest } = props;
    return (
      <Link className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (props.as === 'a') {
    const { ...rest } = props;
    return (
      <a className={classes} {...rest}>
        {content}
      </a>
    );
  }

  const { loading, disabled, ...rest } = props;
  return (
    <button className={classes} disabled={disabled || loading} aria-busy={loading} {...rest}>
      {icon && iconSide === 'start' && (
        <span className={clsx(styles.icon, { [styles.hide]: loading })}>{icon}</span>
      )}
      {loading && <Loader aria-hidden className={styles.spinner}></Loader>}
      <Text
        as='span'
        variant='button'
        className={clsx(styles[`${size}Text`], { [styles.hide]: loading })}
      >
        {children}
      </Text>
      {icon && iconSide === 'end' && (
        <span className={clsx(styles.icon, { [styles.hide]: loading })}>{icon}</span>
      )}
    </button>
  );
};
