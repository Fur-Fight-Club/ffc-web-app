"use client";

import { Grid } from "@nextui-org/react";
import styles from "./page.module.scss";

type DashboardProps = {};

const Dashboard = (props: DashboardProps) => {
  return (
    <div className={styles.dashboardContainer}>
      <Grid.Container gap={2} justify="space-between">
        <Grid xs={4}>pouet</Grid>
        <Grid xs={4}>pouet</Grid>
        <Grid xs={4}>pouet</Grid>
        <Grid xs={4}>pouet</Grid>
        <Grid xs={4}>pouet</Grid>
        <Grid xs={4}>pouet</Grid>
      </Grid.Container>
    </div>
  );
};

export default Dashboard;
