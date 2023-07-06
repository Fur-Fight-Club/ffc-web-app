"use client";

import CardList from "@components/CardList/components/CardList";
import { Button, Grid, Row, Spacer } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { joinMatchFormState } from "src/store/matches/selector";
import { setMonsterJoinForm, setStepJoinForm } from "src/store/matches/slice";
import { Monster } from "src/store/monsters/monsters.model";
import MonsterCardDetails from "../../../organize/components/MonsterCardDetails";
import MonsterCardPreview from "../../../organize/components/MonsterCardPreview";

type Step2Props = {};

const Step2 = (props: Step2Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useSelector(applicationState);
  const monsters = user?.Monster;

  const { monster } = useSelector(joinMatchFormState);

  const handleOnClick = (selectedMonster: Monster) => {
    monster?.id === selectedMonster.id
      ? dispatch(setMonsterJoinForm(null))
      : // @ts-ignore
        dispatch(setMonsterJoinForm(selectedMonster));
  };

  const handleNextStep = () => {
    dispatch(setStepJoinForm(1));
    toast.success("Monstre sélectionné");
  };

  const handleStepBack = () => {
    dispatch(setStepJoinForm(0));
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
            {/* @ts-ignore */}
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
            {/* @ts-ignore */}
            <MonsterCardPreview monster={monster} />
          </div>
        </Grid>
      </Grid.Container>
      <Row justify="flex-end">
        <Button bordered onClick={handleStepBack}>
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

export default Step2;
