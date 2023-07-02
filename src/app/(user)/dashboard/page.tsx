"use client";

import { Card, Grid } from "@nextui-org/react";
import KpiCardsGraph from "./components/KPI/KpiCardGraph.component";
import UserOverview from "./components/UserOverview/UserOverview";
import styles from "./page.module.scss";
import { Car } from "@phosphor-icons/react";

type DashboardProps = {};

const Dashboard = (props: DashboardProps) => {
  return (
    <div className={styles.dashboardContainer}>
      <Grid.Container gap={2} justify="space-between">
        <Grid xs={4}>
          <Card>
            <Card.Body css={{ p: 0 }}>
              <Card.Image
                src={"/images/ffc-logo.svg"}
                objectFit="cover"
                width="20%"
              />
            </Card.Body>
          </Card>
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
        <Grid xs={4}></Grid>
      </Grid.Container>
    </div>
  );
};

export default Dashboard;
