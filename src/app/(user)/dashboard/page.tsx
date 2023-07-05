"use client";

import { Card, Grid, Button } from "@nextui-org/react";
import KpiCardsGraph from "./components/KPI/KpiCardGraph.component";
import UserOverview from "./components/UserOverview/UserOverview";
import styles from "./page.module.scss";
import BestMonsterMmr from "./components/BestMonsterMmr/BestMonsterMmr";
import { useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type DashboardProps = {};

const Dashboard = (props: DashboardProps) => {
  const { user } = useSelector(applicationState);
  const [bestMonster, setBestMonster] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (user.Monster.length > 0) {
      setBestMonster(
        user?.Monster?.reduce((prev, current) =>
          prev.mmr > current.mmr ? prev : current
        )
      );
    }
  }, [user?.Monster]);

  let totalMatches = 0;
  let totalWins = 0;

  user.Monster?.forEach((monster) => {
    totalMatches += monster.MatchFighter1.length + monster.MatchFighter2.length;
    totalWins +=
      monster.MatchFighter1.filter((match) => match.fk_winner === monster.id)
        .length +
      monster.MatchFighter2.filter((match) => match.fk_winner === monster.id)
        .length;
  });

  return (
    <div className={styles.dashboardContainer}>
      <Grid.Container gap={2} justify="space-between">
        <Grid xs={4}>
          <Card>
            <Card.Body css={{ p: 0 }}>
              <UserOverview />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={4}>
          {user?.Monster?.length > 0 ? (
            <BestMonsterMmr monster={bestMonster} />
          ) : (
            <BestMonsterMmr monster={null} />
          )}
        </Grid>
        <Grid xs={4}>
          <KpiCardsGraph
            kpiMaxValue={totalMatches}
            firstString="Combat gagnés"
            kpiValue={totalWins}
            secondString="de match gagnées"
          />
        </Grid>
        <Grid xs={4}>pouet</Grid>
        <Grid xs={4}>pouet</Grid>
        <Grid xs={4}></Grid>
      </Grid.Container>
    </div>
  );
};

export default Dashboard;
