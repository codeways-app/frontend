import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { AuthCard } from '@/widgets/AuthCard';
import { usePageTitle } from '@/shared/hooks';

import { SignUpForm, VerifyEmailForm, CreateAccountForm } from '../forms';
import { DEFAULT_SIGN_UP_DATA } from '../constants';
import { SignUpData } from '../types';

export const SignUpPage = () => {
  const t = useTranslations('translation');

  const [step, setStep] = useState<number>(1);
  const [signUpData, setSignUpData] = useState<SignUpData>(DEFAULT_SIGN_UP_DATA);

  const onNext = () => setStep((prev) => prev + 1);

  usePageTitle(t('auth.title.signUp'));

  return (
    <AuthCard title={t('auth.title.signUp')} oauth={step === 1} fade={step !== 1 ? step : false}>
      {step === 1 && <SignUpForm setSignUpData={setSignUpData} onNext={onNext} />}
      {step === 2 && (
        <VerifyEmailForm signUpData={signUpData} setSignUpData={setSignUpData} onNext={onNext} />
      )}
      {step === 3 && <CreateAccountForm signUpData={signUpData} />}
    </AuthCard>
  );
};
