"use client";

import CardList from "@components/CardList/components/CardList";
import { Grid } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { createMatchFormState } from "src/store/matches/selector";
import { setMonsterCreateForm } from "src/store/matches/slice";
import { Monster } from "src/store/monsters/monsters.model";

type OrganizeMatchPageProps = {};

const OrganizeMatchPage = (props: OrganizeMatchPageProps) => {
  const dispatch = useDispatch();

  const { user } = useSelector(applicationState);
  const { monster, step, arena, bet } = useSelector(createMatchFormState);

  const monsters = user?.Monster;
  console.log("monsters", monsters);

  const handleOnClick = (monster: Monster) => {
    console.log("set Monster");
    dispatch(setMonsterCreateForm(monster));
    toast.success("Monster ajouté dans le store");
  };

  return (
    <Grid.Container css={{ height: "100%" }}>
      <Grid xs={4}>
        <div style={{ width: "100%" }}>
          <div>Vos monstres</div>
          <CardList>
            {monsters?.map((monster) => (
              <CardList.MonsterItem
                key={monster.id}
                monster={monster}
                onClick={() => handleOnClick(monster)}
              />
            ))}
          </CardList>
        </div>
      </Grid>
      <Grid xs={4}>
        <div style={{ width: "100%" }}>Match</div>
      </Grid>
      <Grid xs={4}>
        <div>Match</div>
      </Grid>
    </Grid.Container>
  );
};

export default OrganizeMatchPage;
