"use client";

import { Grid } from "@nextui-org/react";
import UserOverview from "./components/UserOverview/UserOverview";
import styles from "./page.module.scss";
import MyMonstersCard from "@components/MyMonstersCard/MyMonstersCard";

type DashboardProps = {};

const Dashboard = (props: DashboardProps) => {
  return (
    <div className={styles.dashboardContainer}>
      <Grid.Container gap={2} justify="space-between">
        <Grid xs={4}>
          <UserOverview fullname="Adrien Morin" inscriptionDate="" />
        </Grid>
        <Grid xs={4}>pouet</Grid>
        <Grid xs={4}>pouet</Grid>
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
