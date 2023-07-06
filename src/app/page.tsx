"use client";

import warriorsDark from "@assets/animations/warriors-dark.json";
import warriorsLight from "@assets/animations/warriors-light.json";
import NavbarTest from "@components/Navbar";
import { Button } from "@components/UI/Button/Button.component";
import { Card, Grid, Text, useTheme } from "@nextui-org/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import Lottie from "lottie-react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Match } from "src/store/matches/matches.model";
import { useGetMatchesQuery } from "src/store/matches/slice";
import { MatchList } from "./components/MatchList/MatchList.component";
import styles from "./page.module.scss";

export default function Home() {
  const { data: matches, refetch } = useGetMatchesQuery();

  const { isDark } = useTheme();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMatches, setSelectedMatches] = useState<Match[]>([]);

  const router = useRouter();

  useEffect(() => {
    setSelectedMatches(
      matches?.filter(
        (match) =>
          new Date(match.matchStartDate).toLocaleDateString("fr-FR") ===
          selectedDate.toLocaleDateString("fr-FR")
      ) ?? []
    );
  }, [matches, selectedDate]);

  useEffect(() => {
    refetch();
  }, [matches]);
  return (
    <>
      <NavbarTest />
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <Card className={styles.matchCard}>
              <Card.Header>
                <Grid.Container
                  gap={0}
                  alignContent="center"
                  justify="center"
                  alignItems="center"
                >
                  <Grid xs={4} justify="flex-start">
                    <Button
                      auto
                      icon={<CaretLeft size={32} />}
                      onPress={() =>
                        setSelectedDate(
                          new Date(
                            selectedDate.setDate(selectedDate.getDate() - 1)
                          )
                        )
                      }
                    />
                  </Grid>
                  <Grid xs={4} justify="center">
                    <Text h5>{selectedDate.toLocaleDateString("fr-FR")}</Text>
                  </Grid>
                  <Grid xs={4} justify="flex-end">
                    <Button
                      auto
                      icon={<CaretRight size={32} />}
                      onPress={() =>
                        setSelectedDate(
                          new Date(
                            selectedDate.setDate(selectedDate.getDate() + 1)
                          )
                        )
                      }
                    />
                  </Grid>
                </Grid.Container>
              </Card.Header>
              <Card.Body>
                <Grid.Container gap={2} justify="center">
                  {selectedMatches.map((match, index) => (
                    <MatchList match={match} key={index} />
                  ))}
                  {selectedMatches.length === 0 && (
                    <Text h4>Aucun match de prevu pour cette date 😔</Text>
                  )}
                </Grid.Container>
              </Card.Body>
            </Card>
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
            animationData={isDark ? warriorsDark : warriorsLight}
            className={styles.lottieWarriors}
          />
        </header>
        {/* <section className={styles.section}>
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
        </footer> */}
      </main>
    </>
  );
}
