import { useTranslations } from 'next-intl';

import styles from './MktFooter.module.css';

export const MktFooter = () => {
  const t = useTranslations('home');

  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src='/logo.png'
          alt='logo'
          style={{ width: 26, height: 26, display: 'block', flexShrink: 0 }}
        />
        <span>Codeways</span>
      </div>
      <span className={styles.copy}>{t('footer.copy')}</span>
    </footer>
  );
};
