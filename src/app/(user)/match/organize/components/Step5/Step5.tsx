"use client";

import { Button, Row, Spacer, Text } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { createMatchFormState } from "src/store/matches/selector";
import { setStepCreateForm } from "src/store/matches/slice";

type Step5Props = {};

const Step5 = (props: Step5Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { monster, step, arena, bet, date } = useSelector(createMatchFormState);

  const handleNextStep = () => {
    dispatch(setStepCreateForm(5));
  };

  const handleStepBack = () => {
    dispatch(setStepCreateForm(3));
  };

  return (
    <div style={{ height: "80vh" }}>
      <Text>Paiment</Text>
      <Row justify="flex-end">
        <Button bordered onClick={handleStepBack}>
          Retour
        </Button>
        <Spacer x={0.5} />
        <Button onClick={handleNextStep}>Suivant</Button>
      </Row>
    </div>
  );
};

export default Step5;
