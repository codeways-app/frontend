import { useTranslations } from 'next-intl';

import { Text } from '@/shared/components/Text';
import { Button } from '@/shared/components/Button';

import { Header } from '../components/Header';

import Grainient from '@/shared/shadcn/components/Grainient';

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
            blendAngle={0}
            blendSoftness={0}
            rotationAmount={650}
            noiseScale={2}
            grainAmount={0.1}
            grainScale={2}
            grainAnimated={false}
            contrast={1.65}
            gamma={1}
            saturation={1.45}
            centerX={0}
            centerY={0}
            zoom={0.9}
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
              href={'./auth/sign-up'}
            >
              {t('button.getStarted')}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};
