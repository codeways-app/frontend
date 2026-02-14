import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { usePageTitle } from '@/shared/hooks';
import { AuthCard } from '@/widgets/AuthCard';

import { SignInForm, TwoFactorForm } from '../forms';
import { DEFAULT_SIGN_IN_DATA } from '../constants';
import { SignInData } from '../types';

export const SignInPage = () => {
  const t = useTranslations('translation');

  const [step, setStep] = useState<number>(1);
  const [signInData, setSignInData] = useState<SignInData>(DEFAULT_SIGN_IN_DATA);

  const onNext = () => setStep((prev) => prev + 1);

  usePageTitle(t('auth.title.signIn'));

  return (
    <AuthCard title={t('auth.title.signIn')} oauth={step === 1} fade={step !== 1}>
      {step === 1 && <SignInForm onNext={onNext} setSignInData={setSignInData} />}
      {step === 2 && <TwoFactorForm signInData={signInData} />}
    </AuthCard>
  );
};
