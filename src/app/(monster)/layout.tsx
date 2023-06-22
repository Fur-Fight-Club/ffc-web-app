"use client";

import styles from "./layout.module.scss";
import NavbarTest from "@components/Navbar";

type LoginLayoutProps = {
  children: React.ReactNode;
};

export default function MonsterLayout({ children }: LoginLayoutProps) {
  return (
    <div>
      <nav className={styles.navbar}>
        <NavbarTest />
      </nav>
      <main className={styles.wrapper}>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
