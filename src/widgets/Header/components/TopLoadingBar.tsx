'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';

import styles from './TopLoadingBar.module.css';

export const TopLoadingBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const [isRouting, setIsRouting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  const isLoading = isRouting || isFetching > 0 || isMutating > 0;

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      setProgress(85);
    } else {
      setProgress(100);
      const timeout = setTimeout(() => {
        setVisible(false);
        setTimeout(() => setProgress(0), 200);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  useEffect(() => {
    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = (...args) => {
      setIsRouting(true);
      return originalPush(...args);
    };

    router.replace = (...args) => {
      setIsRouting(true);
      return originalReplace(...args);
    };

    return () => {
      router.push = originalPush;
      router.replace = originalReplace;
    };
  }, [router]);

  useEffect(() => {
    setIsRouting(false);
  }, [pathname, searchParams]);

  return (
    <div className={styles.container}>
      <div
        className={styles.bar}
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0,
          transition: isLoading
            ? 'width 10s cubic-bezier(0.1, 0.5, 0, 1), opacity 100ms linear'
            : 'width 200ms ease-out, opacity 300ms ease',
        }}
      >
        <div className={styles.glow} />
      </div>
    </div>
  );
};
