'use client';

import { forwardRef, useId, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Text } from '@/shared/components/Text';
import { Hint } from '@/shared/components/Hint';

import { TextInputProps } from '../types';
import { DEFAULT_TYPE, DEFAULT_INPUT_SIZE } from '../constants';

import { Eye, EyeOff } from 'lucide-react';

import clsx from 'clsx';

import styles from './TextInput.module.css';

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      hint,
      type = DEFAULT_TYPE,
      inputSize = DEFAULT_INPUT_SIZE,
      value,
      invalid,
      hideLabel,
      endIcon,
      disabled,
      noBorder,
      className,
      ...props
    },
    ref,
  ) => {
    const classes = clsx(styles.wrapper, className, disabled && styles.disabled);
    const [showPassword, setShowPassword] = useState(false);

    const t = useTranslations('translation');
    const inputId = useId();

    const isPassword = type === 'password';
    const PasswordIcon = showPassword ? <Eye height={14} /> : <EyeOff height={14} />;
    const inputType = isPassword && showPassword ? 'text' : type;

    const handleClick = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className={classes}>
        <label htmlFor={inputId}>
          <Text className={clsx(hideLabel && 'hidden')}>{label}</Text>
          <div
            className={clsx(
              styles.input,
              styles[inputSize],
              invalid && styles.invalid,
              noBorder && styles.noBorder,
            )}
          >
            <input
              id={inputId}
              type={inputType}
              defaultValue={value}
              className={clsx(styles.control, isPassword && styles.password)}
              disabled={disabled}
              aria-invalid={invalid}
              ref={ref}
              {...props}
            />
            {isPassword ? (
              <button
                type='button'
                onClick={handleClick}
                className={styles.button}
                aria-label={
                  showPassword ? t('auth.button.hidePassword') : t('auth.button.showPassword')
                }
              >
                {PasswordIcon}
              </button>
            ) : (
              endIcon && <span className={styles.icon}>{endIcon}</span>
            )}
          </div>
        </label>
        {hint && <Hint variant={invalid ? 'error' : 'default'}>{hint}</Hint>}
      </div>
    );
  },
);

TextInput.displayName = 'TextInput';
