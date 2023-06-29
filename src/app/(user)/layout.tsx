"use client";

import { useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";

import NavbarTest from "@components/Navbar";
import { isUserLoggedIn } from "@utils/utils";
import styles from "./layout.module.scss";

type UserLayoutProps = {
  children: React.ReactNode;
};

export default function UserLayout({ children }: UserLayoutProps) {
  const { user } = useSelector(applicationState);

  if (isUserLoggedIn(user)) {
    return (
      <div className={styles.wrapper}>
        <NavbarTest />
        <div className={styles.contentWrapper}>{children}</div>
      </div>
    );
  } else {
    throw new Error("Vous devez être connecté pour accéder à cette page");
  }
}
