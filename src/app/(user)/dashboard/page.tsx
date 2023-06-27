"use client";

import MyMonstersCard from "@components/MyMonstersCard/MyMonstersCard";
import { Grid } from "@nextui-org/react";
import KpiCardsGraph from "./components/KPI/KpiCardGraph.component";
import UserOverview from "./components/UserOverview/UserOverview";
import styles from "./page.module.scss";

type DashboardProps = {};

const Dashboard = (props: DashboardProps) => {
  return (
    <div className={styles.dashboardContainer}>
      <Grid.Container gap={2} justify="space-between">
        <Grid xs={4}>
          <UserOverview fullname="Adrien Morin" inscriptionDate="" />
        </Grid>
        <Grid xs={4}>pouet</Grid>
        <Grid xs={4}>
          <KpiCardsGraph
            kpiMaxValue={100}
            firstString="Combat réalisé"
            kpiValue={10}
            secondString="gagnés depuis le début"
          />
        </Grid>
        <Grid xs={4}>pouet</Grid>
        <Grid xs={4}>pouet</Grid>
        <Grid xs={4}>
          <MyMonstersCard />
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default Dashboard;
