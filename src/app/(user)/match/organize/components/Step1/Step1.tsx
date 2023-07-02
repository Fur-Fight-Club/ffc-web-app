"use client";

import CardList from "@components/CardList/components/CardList";
import { Button, Grid, Row, Spacer } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { createMatchFormState } from "src/store/matches/selector";
import {
  setMonsterCreateForm,
  setStepCreateForm,
} from "src/store/matches/slice";
import { Monster } from "src/store/monsters/monsters.model";
import MonsterCardDetails from "../MonsterCardDetails";
import MonsterCardPreview from "../MonsterCardPreview";

type Step1Props = {};

const Step1 = (props: Step1Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useSelector(applicationState);
  const monsters = user?.Monster;

  const { monster, step, arena, bet } = useSelector(createMatchFormState);

  const handleOnClick = (selectedMonster: Monster) => {
    monster?.id === selectedMonster.id
      ? dispatch(setMonsterCreateForm(null))
      : dispatch(setMonsterCreateForm(selectedMonster));
  };

  const handleNextStep = () => {
    dispatch(setStepCreateForm(1));
    toast.success("Monstre sélectionné");
  };

  return (
    <div style={{ height: "95%" }}>
      <Grid.Container css={{ height: "100%", position: "relative" }} gap={2}>
        <Grid xs={4}>
          <div style={{ width: "100%" }}>
            <div>Vos monstres</div>
            <CardList>
              {monsters?.map((monsterItem) => (
                <CardList.MonsterItem
                  key={monsterItem.id}
                  monster={monsterItem}
                  onClick={() => handleOnClick(monsterItem)}
                  isSelected={monster?.id === monsterItem.id}
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
            <MonsterCardPreview monster={monster} />
          </div>
        </Grid>
      </Grid.Container>
      <Row justify="flex-end">
        <Button bordered onClick={() => router.push("/match")}>
          Retour
        </Button>
        <Spacer x={0.5} />
        <Button {...(!monster && { disabled: true })} onClick={handleNextStep}>
          Suivant
        </Button>
      </Row>
    </div>
  );
};

export default Step1;
