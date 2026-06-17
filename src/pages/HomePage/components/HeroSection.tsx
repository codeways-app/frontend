import { useTranslations } from 'next-intl';
import { Sparkles, ArrowRight, ArrowUpRight } from 'lucide-react';

import { Grainient } from '@/shared/components/Grainient';
import { Text } from '@/shared/components/Text';
import { Button } from '@/shared/components/Button';
import { ROUTES } from '@/shared/constants';

import { GRAINIENT_PROPS, STATS } from '../constants';

import styles from './HeroSection.module.css';

export const HeroSection = () => {
  const t = useTranslations('home');

  return (
    <section className={styles.hero}>
      <div className={styles.heroBg}>
        <Grainient {...GRAINIENT_PROPS} />
      </div>
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>
            <Sparkles size={15} />
            {t('hero.eyebrow')}
          </span>
          <Text variant='label' weight={700} className={styles.heroTitle}>
            {t.rich('hero.title', { br: () => <br /> })}
          </Text>
          <Text variant='title3' color='content1' className={styles.heroDesc}>
            {t('hero.description')}
          </Text>
          <div className={styles.heroCta}>
            <Button
              as='Link'
              href={ROUTES.auth.signUp()}
              variant='white'
              size='md'
              icon={<ArrowRight />}
              iconSide='end'
            >
              {t('hero.cta.primary')}
            </Button>
            <Button variant='transparentWhite' size='md' icon={<ArrowUpRight />} iconSide='end'>
              {t('hero.cta.secondary')}
            </Button>
          </div>
          <div className={styles.heroStats}>
            {STATS.map((s) => (
              <div key={s.key} className={styles.stat}>
                <span className={styles.statN}>{s.n}</span>
                <span className={styles.statL}>{t(`stats.${s.key}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
