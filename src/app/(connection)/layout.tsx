'use client';

import fireAnimation from '@assets/animations/fire.json';
import Lottie from 'lottie-react';
import styles from './layout.module.scss';

type LoginLayoutProps = {
  children: React.ReactNode;
};

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <main className={styles.wrapper}>
      <div className={styles.leftPanel}>
        <Lottie animationData={fireAnimation} />
      </div>
      <div className={styles.rightPanel}>{children}</div>
    </main>
  );
}
