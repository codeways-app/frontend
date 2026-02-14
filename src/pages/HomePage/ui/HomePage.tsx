import { useTranslations } from 'next-intl';

import { Grainient } from '@/shared/components/Grainient';
import { Text } from '@/shared/components/Text';
import { Button } from '@/shared/components/Button';

import { ROUTES } from '@/shared/constants';

import { Header } from '../components/Header';

import styles from './Home.module.css';

export const HomePage = () => {
  const t = useTranslations('translation.home');

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.welcome}>
          <Grainient
            color1='#772df6'
            color2='#180931'
            color3='#ad81fa'
            timeSpeed={1.1}
            colorBalance={-0.41}
            warpStrength={0.2}
            warpFrequency={10}
            warpSpeed={2}
            warpAmplitude={600}
            rotationAmount={650}
            noiseScale={2}
            contrast={1.65}
            saturation={1.45}
            className={styles.background}
          />
          <div className={styles.label}>
            <div className={styles.text}>
              <Text variant='label' className={styles.gradient}>
                {t('label.achieveMastery')}
              </Text>
            </div>
            <Text variant='label'>{t('label.throughChallenge')}</Text>
          </div>
          <Text variant='title4' className={styles.description}>
            {t.rich('text.description', {
              br: () => <br />,
            })}
          </Text>
          <div>
            <Button
              as='Link'
              size='md'
              variant='primary'
              className={styles.start}
              href={ROUTES.auth.signUp()}
            >
              {t('button.getStarted')}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};
