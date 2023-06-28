"use client";

import CardList from "@components/CardList/components/CardList";
import { Button, Grid, Row, Spacer, Text } from "@nextui-org/react";
import colors from "@styles/_colors.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { createMatchFormState } from "src/store/matches/selector";
import { setMonsterCreateForm } from "src/store/matches/slice";
import { Monster } from "src/store/monsters/monsters.model";
import MonsterCardDetails from "./components/MonsterCardDetails/MonsterCardDetails";
import MonsterCardPreview from "./components/MonsterCardPreview/MonsterCardPreview";

type OrganizeMatchPageProps = {};

const OrganizeMatchPage = (props: OrganizeMatchPageProps) => {
  const dispatch = useDispatch();

  const { user } = useSelector(applicationState);
  const monsters = user?.Monster;

  const { monster, step, arena, bet } = useSelector(createMatchFormState);

  const handleOnClick = (selectedMonster: Monster) => {
    monster?.id === selectedMonster.id
      ? dispatch(setMonsterCreateForm(null))
      : dispatch(setMonsterCreateForm(selectedMonster));
  };

  return (
    <div style={{ height: "95%" }}>
      <Grid.Container css={{ height: "100%", position: "relative" }} gap={2}>
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
          <div style={{ width: "100%" }}>
            <div>Fiche</div>
            <MonsterCardDetails monster={monster} />
          </div>
        </Grid>
        <Grid xs={4}>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              h3
              size={"$lg"}
              css={{ textAlign: "center" }}
              color={colors.primaryT300}
            >
              Votre combattant :
            </Text>
            <MonsterCardPreview monster={monster} />
          </div>
        </Grid>
      </Grid.Container>
      <Row justify="flex-end">
        <Button bordered>Retour</Button>
        <Spacer x={0.5} />
        <Button>Suivant</Button>
      </Row>
    </div>
  );
};

export default OrganizeMatchPage;
