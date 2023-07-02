"use client";

import { Button, Row, Spacer, Text } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { createMatchFormState } from "src/store/matches/selector";
import { setStepCreateForm } from "src/store/matches/slice";

type Step4Props = {};

const Step4 = (props: Step4Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { monster, step, arena, bet } = useSelector(createMatchFormState);

  const handleNextStep = () => {
    // TODO : Go to payment page
  };

  const handleStepBack = () => {
    dispatch(setStepCreateForm(2));
  };

  return (
    <div style={{ height: "86%" }}>
      <Row>
        <Text b size={"$3xl"}>
          {"Récapitulatif"}
        </Text>
      </Row>
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

export default Step4;
