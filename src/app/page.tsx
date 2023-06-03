'use client';

import NavbarTest from '@components/Navbar';
import styles from './page.module.scss';

export default function Home() {
  return (
    <>
      <NavbarTest />
      <main className={styles.main}></main>
    </>
  );
}
