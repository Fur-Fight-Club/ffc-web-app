'use client';

import BetList, { BetListItem } from './components/BetList';
import styles from './page.module.scss';

export default function Home() {
  return (
    <>
      {/* <NavbarTest /> */}
      <main className={styles.main}>
        <header className={styles.header}>
          {/* <Lottie
            animationData={warriorsAnimation}
            className={styles.lottieWarriors}
          /> */}
          <h2 className={styles.title}>La première règle du FFC</h2>
          <BetList>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => (
              <BetListItem key={i}>test</BetListItem>
            ))}
          </BetList>
        </header>
        <section className={styles.section}>
          <h2 className={styles.title}>{"Qu'est-ce que le FFC ?"} </h2>
        </section>
        <section className={styles.section}>
          <h2 className={styles.title}>{'Comment ça fonctionne ?'} </h2>
        </section>
        <section className={styles.section}>
          <h2 className={styles.title}>{'Entrez dans la légende'} </h2>
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
