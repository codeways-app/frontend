'use client';

import { useTranslations } from 'next-intl';

import { Grainient } from '@/shared/components/Grainient';
import { TextInput } from '@/shared/components/TextInput';
import { Text } from '@/shared/components/Text';
import { Button } from '@/shared/components/Button';

import { Header } from '../components/Header';

import { POPULAR_TAGS } from '../constants';

import { ArrowRight, Search } from 'lucide-react';

import clsx from 'clsx';

import styles from './Home.module.css';
import { usePageTitle } from '@/shared/hooks';

export const HomePage = () => {
  const t = useTranslations('home');

  usePageTitle('Codeways');

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
          <div className={styles.hero}>
            <div className={styles.content}>
              <Text variant='label' weight={700} className={styles.title}>
                {t.rich('hero.title', {
                  br: () => <br />,
                })}
              </Text>
              <Text variant='title3' color='content1' className={styles.description}>
                {t.rich('hero.description', {
                  br: () => <br />,
                })}
              </Text>
              <div className={styles.search}>
                <TextInput
                  hideLabel
                  label={t('search.label')}
                  noBorder
                  inputSize='lg'
                  placeholder={t('search.placeholder')}
                  className={styles.input}
                  startIcon={<Search />}
                />
                <Button variant='white' size='md' icon={<ArrowRight />} iconSide='end'>
                  {t('search.button')}
                </Button>
              </div>
              <div className={styles.popular}>
                <Text variant='text1'>{t('popular.title')}</Text>
                {POPULAR_TAGS.map((tag) => (
                  <Button key={tag} variant='black' className={styles.tag}>
                    {t(`popular.tags.${tag}`)}
                  </Button>
                ))}
              </div>
            </div>
            <div className={styles.cards}>
              <div className={clsx(styles.card, styles.card1)}>
                <Text variant='label' weight={700} className={styles.number}>
                  2.4M+
                </Text>
                <Text variant='title4' className={styles.description}>
                  {t('stats.users')}
                </Text>
              </div>
              <div className={styles.card}>
                <Text variant='label' weight={700} className={styles.number}>
                  150K+
                </Text>
                <Text variant='title4' className={styles.description}>
                  {t('stats.companies')}
                </Text>
              </div>
              <div className={styles.card}>
                <Text variant='label' weight={700} className={styles.number}>
                  500K+
                </Text>
                <Text variant='title4' className={styles.description}>
                  {t('stats.jobs')}
                </Text>
              </div>
              <div className={styles.card}>
                <Text variant='label' weight={700} className={styles.number}>
                  98%
                </Text>
                <Text variant='title4' className={styles.description}>
                  {t('stats.satisfaction')}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
