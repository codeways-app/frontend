import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { SignInData } from '@/pages/auth/SignInPage/types';
import { Button } from '@/shared/components/Button';
import { TextInput } from '@/shared/components/TextInput';
import { Text } from '@/shared/components/Text';

import { ROUTES } from '@/shared/constants';

import { DEFAULT_SIGN_IN_VALUES } from '../constants';
import { signInSchema } from '../model';
import { SignInFields } from '../types';
import { useSignIn } from '../api';

import Link from 'next/link';

import styles from '../../../ui/SignInPage.module.css';

export const SignInForm = ({
  onNext,
  setSignInData,
}: {
  onNext: () => void;
  setSignInData: React.Dispatch<React.SetStateAction<SignInData>>;
}) => {
  const t = useTranslations('translation');
  const router = useRouter();

  const signInMutation = useSignIn();

  const {
    register,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFields>({
    resolver: zodResolver(signInSchema),
    defaultValues: DEFAULT_SIGN_IN_VALUES,
  });

  const onSubmit = handleSubmit((values) => {
    setSignInData((prev) => ({ ...prev, login: values.login, password: values.password }));
    signInMutation.mutate(
      { login: values.login, password: values.password },
      {
        onSuccess: (data) => {
          if ('accessToken' in data) {
            router.push(ROUTES.dashboard.main());
          } else {
            onNext();
          }
        },
      },
    );
  });

  useEffect(() => {
    setFocus('login');
  }, [setFocus]);

  return (
    <form onSubmit={onSubmit} className={styles.form} noValidate>
      <TextInput
        label={t('auth.label.login')}
        placeholder={t('auth.placeholder.enterLogin')}
        invalid={!!errors.login}
        hint={errors.login?.message && t(errors.login.message)}
        {...register('login')}
      ></TextInput>
      <TextInput
        label={t('auth.label.password')}
        type='password'
        placeholder={t('auth.placeholder.enterPassword')}
        invalid={!!errors.password}
        hint={errors.password?.message && t(errors.password.message)}
        className={styles.margin}
        {...register('password')}
      ></TextInput>

      <div className={styles.container}>
        <Text color='content1'>
          <Link href={ROUTES.auth.recover()}>{t('auth.text.forgotPassword')}</Link>
        </Text>
      </div>
      <Button
        type='submit'
        size='md'
        variant='primary'
        className={styles.button}
        loading={signInMutation.isPending}
        fullWidth
      >
        {t('auth.button.signIn')}
      </Button>
      <div className={styles.footer}>
        <Text color='content1'>{t('auth.text.noAccount')}</Text>
        <Text>
          <Link href={ROUTES.auth.signUp()}>{t('auth.text.signUp')}</Link>
        </Text>
      </div>
    </form>
  );
};
