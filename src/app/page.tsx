"use client";

import warriorsAnimation from "@assets/animations/warriors.json";
import NavbarTest from "@components/Navbar";
import { Text } from "@nextui-org/react";
import Lottie from "lottie-react";
import BetList, { BetListItem } from "./components/BetList";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <>
      <NavbarTest />
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <BetList>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => (
                <BetListItem key={i} />
              ))}
            </BetList>
            <div className={styles.catchPhrase}>
              <Text h1 weight={"bold"} size={"$6xl"}>
                Faites combattre vos monstres
              </Text>
              <Text h1 weight={"bold"} size={"$4xl"}>
                {"Et gagnez de l'argent !"}
              </Text>
            </div>
          </div>

          <Lottie
            animationData={warriorsAnimation}
            className={styles.lottieWarriors}
          />
        </header>
        <section className={styles.section}>
          <h2 className={styles.title}>{"Qu'est-ce que le FFC ?"} </h2>
        </section>
        <section className={styles.section}>
          <h2 className={styles.title}>{"Comment ça fonctionne ?"} </h2>
        </section>
        <section className={styles.section}>
          <h2 className={styles.title}>{"Entrez dans la légende"} </h2>
        </section>
        <footer className={styles.footer}>
          <ul>
            <li>pouet</li>
            <li>pouet</li>
            <li>pouet</li>
          </ul>
        </footer>
      </main>
    </>
  );
}
