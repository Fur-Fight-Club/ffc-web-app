'use client';

import fireAnimation from '@assets/animations/fire.json';
import { CaretLeft } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './layout.module.scss';

type LoginLayoutProps = {
  children: React.ReactNode;
};

export default function LoginLayout({ children }: LoginLayoutProps) {
  const router = useRouter();

  return (
    <main className={styles.wrapper}>
      <div className={styles.contentPanel}>
        <nav className={styles.navbar}>
          <motion.a
            onClick={router.back}
            className={styles.goBack}
            whileHover={{ scale: 1.3, color: '#b91919' }}
          >
            <CaretLeft size={32} weight="bold" />
          </motion.a>

          <Link href="/">
            <Image
              className={styles.logo}
              src="/images/ffc-logo.svg"
              width={90}
              height={90}
              alt="logo"
            />
          </Link>

          <div></div>
        </nav>
        {children}
      </div>
      <div className={styles.imgPanel}>
        <Lottie animationData={fireAnimation} />
      </div>
    </main>
  );
}
