import clsx from 'clsx';

import styles from './SkeletonList.module.css';

export const SkeletonList = () => {
  return (
    <li className={styles.chat}>
      <div className={styles.main}>
        <div className={clsx(styles.skeleton, styles.avatar)}></div>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={clsx(styles.skeleton, styles.title)}></div>
            <div className={clsx(styles.skeleton, styles.date)}></div>
          </div>
          <div className={clsx(styles.skeleton, styles.message)}></div>
        </div>
      </div>
    </li>
  );
};
