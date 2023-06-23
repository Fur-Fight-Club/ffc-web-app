"use client";

import NavbarTest from "@components/Navbar";
import styles from "./layout.module.scss";

type UserLayoutProps = {
  children: React.ReactNode;
};

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <NavbarTest />
      <div className={styles.contentWrapper}>{children}</div>
    </div>
  );
}
