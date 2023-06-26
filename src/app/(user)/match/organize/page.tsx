"use client";

import CardList from "@components/CardList/CardList";
import { Grid } from "@nextui-org/react";

type OrganizeMatchPageProps = {};

const OrganizeMatchPage = (props: OrganizeMatchPageProps) => {
  return (
    <Grid.Container css={{ height: "100%" }}>
      <Grid xs={4}>
        <div style={{ width: "100%" }}>
          <div>Vos monstres</div>
          <CardList />
        </div>
      </Grid>
      <Grid xs={4}>
        <div>Match</div>
      </Grid>
      <Grid xs={4}>
        <div>Match</div>
      </Grid>
    </Grid.Container>
  );
};

export default OrganizeMatchPage;
