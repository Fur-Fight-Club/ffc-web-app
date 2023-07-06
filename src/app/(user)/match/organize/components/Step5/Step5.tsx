"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { createMatchFormState } from "src/store/matches/selector";
import { setStepCreateForm } from "src/store/matches/slice";

import thanks from "@assets/animations/thanks.json";
import { Button, Row, Spacer, Text } from "@nextui-org/react";
import Lottie from "lottie-react";

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

  const finishStep = () => {
    router.push("/");
  };

  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Lottie
        animationData={thanks}
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      <Row justify="center">
        <Text h1>MERCI !</Text>
      </Row>
      <Row justify="center">
        <Spacer x={0.5} />
        <Button onClick={finishStep}>Terminer</Button>
      </Row>
    </div>
  );
};

export default Step5;
