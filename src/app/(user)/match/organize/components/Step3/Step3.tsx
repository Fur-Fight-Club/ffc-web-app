"use client";

import { Button, Row, Spacer, Text } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetArenasQuery } from "src/store/arenas/slice";
import { createMatchFormState } from "src/store/matches/selector";
import { setStepCreateForm } from "src/store/matches/slice";
import styles from "./Step3.module.scss";
import BetButton from "./components/BetButton";

type Step3Props = {};

const Step3 = (props: Step3Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { monster, step, arena, bet } = useSelector(createMatchFormState);
  const { data: arenas, refetch } = useGetArenasQuery();

  console.log("arenas", arenas);

  const handleOnClick = (selectedBet: number) => {
    // arena?.id === selectedArena.id
    //   ? dispatch(setMonsterCreateForm(null))
    //   : dispatch(setArenaCreateForm(selectedArena));
    // dispatch(setStepCreateForm(2));
  };

  const handleStepBack = () => {
    dispatch(setStepCreateForm(1));
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div style={{ height: "92%" }}>
      <div className={styles.step3}>
        <Text size={"$5xl"}>100</Text>
        <Row justify="space-around">
          <BetButton bordered>-1000</BetButton>
          <BetButton bordered>-100</BetButton>
          <BetButton bordered>-10</BetButton>
          <BetButton>+10</BetButton>
          <BetButton>+100</BetButton>
          <BetButton>+1000</BetButton>
        </Row>
      </div>
      <Row justify="flex-end">
        <Button bordered onClick={handleStepBack}>
          Retour
        </Button>
        <Spacer x={0.5} />
        <Button {...(!bet && { disabled: true })} onClick={handleOnClick}>
          Suivant
        </Button>
      </Row>
    </div>
  );
};

export default Step3;
