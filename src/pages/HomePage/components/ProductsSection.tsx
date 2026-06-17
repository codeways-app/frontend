import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';

import { Text } from '@/shared/components/Text';

import { PRODUCTS } from '../constants';

import styles from './ProductsSection.module.css';

export const ProductsSection = () => {
  const t = useTranslations('home');

  return (
    <section className={styles.section}>
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
      <div className={styles.grid}>
        {PRODUCTS.map(({ key, Icon, link }) => (
          <div key={key} className={styles.card}>
            <div className={styles.cardTop}>
              <span className={styles.icon}>
                <Icon size={24} />
              </span>
              <span className={styles.badge}>{t(`products.${key}.tag`)}</span>
            </div>
            <Text variant='title3' weight={600} className={styles.cardName}>
              {t(`products.${key}.name`)}
            </Text>
            <Text variant='text1' color='content1' className={styles.cardDesc}>
              {t(`products.${key}.desc`)}
            </Text>
            <a className={styles.cardLink} href='#'>
              {link}
              <ArrowUpRight size={16} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
