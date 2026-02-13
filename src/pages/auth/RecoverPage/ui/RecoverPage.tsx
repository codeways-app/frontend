'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { AuthCard } from '@/widgets/AuthCard';
import { usePageTitle } from '@/shared/hooks';

import { RecoverForm, VerifyRecoverForm, NewPasswordForm } from '../forms';
import { DEFAULT_RECOVER_DATA } from '../constants';
import { RecoverData } from '../types';

export const RecoverPage = () => {
  const t = useTranslations('translation');

  const [step, setStep] = useState<number>(1);
  const [recoverData, setRecoverData] = useState<RecoverData>(DEFAULT_RECOVER_DATA);

  const onNext = () => setStep((prev) => prev + 1);

  usePageTitle(t('auth.title.recover'));

  return (
    <AuthCard title={t('auth.title.recover')}>
      {step === 1 && <RecoverForm setRecoverData={setRecoverData} onNext={onNext} />}
      {step === 2 && (
        <VerifyRecoverForm
          recoverData={recoverData}
          setRecoverData={setRecoverData}
          onNext={onNext}
        />
      )}
      {step === 3 && <NewPasswordForm recoverData={recoverData} />}
    </AuthCard>
  );
};
