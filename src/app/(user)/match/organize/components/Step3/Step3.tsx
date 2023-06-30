"use client";

import { Button, Row, Spacer } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetArenasQuery } from "src/store/arenas/slice";
import { createMatchFormState } from "src/store/matches/selector";
import { setStepCreateForm } from "src/store/matches/slice";

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
    <div>
      <h1>Step 3</h1>
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
