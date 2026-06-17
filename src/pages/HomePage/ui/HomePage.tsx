'use client';

import { useTranslations } from 'next-intl';

import { Grainient } from '@/shared/components/Grainient';
import { Text } from '@/shared/components/Text';
import { Button } from '@/shared/components/Button';
import { ROUTES } from '@/shared/constants';

import { Header } from '../components/Header';

import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Layers,
  MessageCircle,
  Cloud,
  Code2,
  Smartphone,
} from 'lucide-react';

import clsx from 'clsx';

import styles from './Home.module.css';

const GRAINIENT_PROPS = {
  color1: '#772df6',
  color2: '#180931',
  color3: '#ad81fa',
  timeSpeed: 1.1,
  colorBalance: -0.41,
  warpStrength: 0.2,
  warpFrequency: 10,
  warpSpeed: 2,
  warpAmplitude: 600,
  rotationAmount: 650,
  noiseScale: 2,
  contrast: 1.65,
  saturation: 1.45,
};

const STATS: Array<{ n: string; key: string }> = [
  { n: '120+', key: 'products' },
  { n: '9 yrs', key: 'years' },
  { n: '40+', key: 'team' },
  { n: '99.9%', key: 'uptime' },
];

const PRODUCTS: Array<{ key: string; Icon: React.ElementType; link: string }> = [
  { key: 'flagship', Icon: Layers, link: 'codeways.software' },
  { key: 'mesh', Icon: MessageCircle, link: 'mesh.codeways.software' },
  { key: 'forge', Icon: Cloud, link: 'forge.codeways.software' },
];

const SERVICES: Array<{ key: string; Icon: React.ElementType }> = [
  { key: 'engineering', Icon: Code2 },
  { key: 'mobile', Icon: Smartphone },
  { key: 'cloud', Icon: Cloud },
  { key: 'ai', Icon: Sparkles },
];

export const HomePage = () => {
  const t = useTranslations('home');

  return (
    <div className={styles.page}>
      <Header />

      {/* HERO */}
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

      {/* PRODUCTS */}
      <section className={styles.productsSection}>
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.kicker}>{t('products.kicker')}</span>
            <Text variant='title1' weight={700} className={styles.sectionTitle}>
              {t('products.title')}
            </Text>
          </div>
          <Text variant='text1' color='content1' className={styles.sectionLead}>
            {t('products.lead')}
          </Text>
        </div>
        <div className={styles.productsGrid}>
          {PRODUCTS.map(({ key, Icon, link }) => (
            <div key={key} className={styles.productCard}>
              <div className={styles.productTop}>
                <span className={styles.productIcon}>
                  <Icon size={24} />
                </span>
                <span className={styles.badge}>{t(`products.${key}.tag`)}</span>
              </div>
              <Text variant='title3' weight={600} className={styles.productName}>
                {t(`products.${key}.name`)}
              </Text>
              <Text variant='text1' color='content1' className={styles.productDesc}>
                {t(`products.${key}.desc`)}
              </Text>
              <a className={styles.productLink} href='#'>
                {link}
                <ArrowUpRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className={styles.servicesSection}>
        <div className={styles.sectionInner}>
          <div className={clsx(styles.sectionHead, styles.sectionHeadServices)}>
            <div>
              <span className={styles.kicker}>{t('services.kicker')}</span>
              <Text variant='title1' weight={700} className={styles.sectionTitle}>
                {t('services.title')}
              </Text>
            </div>
          </div>
          <div className={styles.servicesGrid}>
            {SERVICES.map(({ key, Icon }) => (
              <div key={key} className={styles.service}>
                <span className={styles.serviceIcon}>
                  <Icon size={22} />
                </span>
                <Text variant='title4' weight={600}>
                  {t(`services.${key}.title`)}
                </Text>
                <Text variant='text2' color='content1'>
                  {t(`services.${key}.desc`)}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBg}>
          <Grainient {...GRAINIENT_PROPS} />
        </div>
        <div className={styles.ctaInner}>
          <Text variant='title1' weight={700}>
            {t('cta.title')}
          </Text>
          <Text variant='title4' color='content1' weight={400}>
            {t('cta.desc')}
          </Text>
          <div className={clsx(styles.heroCta, styles.ctaButtons)}>
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

      {/* FOOTER */}
      <footer className={styles.mktFooter}>
        <div className={styles.footerBrand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src='/logo.png' alt='logo' style={{ width: 26, height: 26, display: 'block', flexShrink: 0 }} />
          <span>Codeways</span>
        </div>
        <span className={styles.footerCopy}>{t('footer.copy')}</span>
      </footer>
    </div>
  );
};
