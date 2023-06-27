"use client";

import CardList from "@components/CardList/components/CardList";
import { Grid } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";

type OrganizeMatchPageProps = {};

const OrganizeMatchPage = (props: OrganizeMatchPageProps) => {
  const { user } = useSelector(applicationState);

  const monsters = user?.Monster;
  console.log("monsters", monsters);

  return (
    <Grid.Container css={{ height: "100%" }}>
      <Grid xs={4}>
        <div style={{ width: "100%" }}>
          <div>Vos monstres</div>
          <CardList>
            {monsters?.map((monster) => (
              <CardList.MonsterItem key={monster.id} monster={monster} />
            ))}
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
