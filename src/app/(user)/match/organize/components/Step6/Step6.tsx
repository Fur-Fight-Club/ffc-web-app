"use client";

import { Button, Row, Text } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { createMatchFormState } from "src/store/matches/selector";
import { setStepCreateForm } from "src/store/matches/slice";

type Step6Props = {};

const Step6 = (props: Step6Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { monster, step, arena, bet, date } = useSelector(createMatchFormState);

  const handleStepBack = () => {
    dispatch(setStepCreateForm(4));
  };

  return (
    <div style={{ height: "80vh" }}>
      <Text>Match crée avec succès !</Text>
      <Row justify="flex-end">
        <Button bordered onClick={handleStepBack}>
          Retour
        </Button>
      </Row>
    </div>
  );
};

export default Step6;
