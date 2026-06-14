import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { SignInData } from '@/pages/auth/SignInPage/types';
import { CodeInput } from '@/shared/components/CodeInput';
import { Button } from '@/shared/components/Button';

import { DEFAULT_TWO_FACTOR_VALUES } from '../constants';
import { twoFactorSchema } from '../model';
import { TwoFactorFields } from '../types';
import { useTwoFactor } from '../api';

import styles from '../../../ui/SignInPage.module.css';

export const TwoFactorForm = ({ signInData }: { signInData: SignInData }) => {
  const t = useTranslations('translation');

  const twoFactorMutation = useTwoFactor();

  const [code, setCode] = useState('');
  const [active, setActive] = useState(true);

  const {
    register,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm<TwoFactorFields>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: DEFAULT_TWO_FACTOR_VALUES,
  });

  const { name, ref, onChange, onBlur } = register('token', {
    onChange: (e) => {
      setCode(e.target.value);
    },
    onBlur: () => setActive(false),
  });

  const onFocus = () => setActive(true);

  const onSubmit = handleSubmit((values) => {
    twoFactorMutation.mutate({ login: signInData.login, token: values.token });
  });

  useEffect(() => {
    setFocus('token');
  }, [setFocus]);

  return (
    <form onSubmit={onSubmit} className={styles.form} noValidate>
      <CodeInput
        destination='usermail@gmail.com'
        length={6}
        placeholder={t('auth.placeholder.enterVerificationCode')}
        invalid={!!errors.token}
        hint={errors.token?.message && t(errors.token.message)}
        name={name}
        value={code}
        active={active}
        inputRef={ref}
        onFocus={onFocus}
        onChange={onChange}
        onBlur={onBlur}
      />
      <Button
        type='submit'
        size='md'
        variant='primary'
        className={styles.button}
        loading={twoFactorMutation.isPending}
        fullWidth
      >
        {t('common.confirm')}
      </Button>
    </form>
  );
};
