import { useTranslations } from 'next-intl';

import { Text } from '@/shared/components/Text';
import { Button } from '@/shared/components/Button';

import { WelcomeHeader } from '@/widgets/Header/WelcomeHeader';

import styles from './Home.module.css';

export const HomePage = () => {
  const t = useTranslations('translation.home');

  return (
    <div className={styles.page}>
      <WelcomeHeader />
      <main className={styles.main}>
        <div className={styles.welcome}>
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
