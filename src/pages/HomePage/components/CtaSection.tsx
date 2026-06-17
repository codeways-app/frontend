import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

import { Grainient } from '@/shared/components/Grainient';
import { Text } from '@/shared/components/Text';
import { Button } from '@/shared/components/Button';
import { ROUTES } from '@/shared/constants';

import { GRAINIENT_PROPS } from '../constants';

import styles from './CtaSection.module.css';

export const CtaSection = () => {
  const t = useTranslations('home');

  return (
    <section className={styles.section}>
      <div className={styles.bg}>
        <Grainient {...GRAINIENT_PROPS} />
      </div>
      <div className={styles.inner}>
        <Text variant='title1' weight={700} className={styles.title}>
          {t('cta.title')}
        </Text>
        <Text variant='title4' color='content1' weight={400}>
          {t('cta.desc')}
        </Text>
        <div className={styles.buttons}>
          <Button
            as='Link'
            href={ROUTES.auth.signUp()}
            variant='white'
            size='md'
            icon={<ArrowRight />}
            iconSide='end'
          >
            {t('cta.primary')}
          </Button>
          <Button variant='transparentWhite' size='md'>
            {t('cta.secondary')}
          </Button>
        </div>
      </div>
    </section>
  );
};
