"use client";

import CardList from "@components/CardList/components/CardList";
import { Grid } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";

type OrganizeMatchPageProps = {};

const OrganizeMatchPage = (props: OrganizeMatchPageProps) => {
  const { user } = useSelector(applicationState);

  console.log(user);

  return (
    <Grid.Container css={{ height: "100%" }}>
      <Grid xs={4}>
        <div style={{ width: "100%" }}>
          <div>Vos monstres</div>
          <CardList>
            <CardList.MonsterItem />
            <CardList.MonsterItem />
            <CardList.MonsterItem />
          </CardList>
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
