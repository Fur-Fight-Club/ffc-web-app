"use client";

import { Button, Row, Spacer } from "@nextui-org/react";
import { Trash } from "@phosphor-icons/react";
import { Steps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { joinMatchFormState } from "src/store/matches/selector";
import { resetJoinForm } from "src/store/matches/slice";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";

type OrganizeMatchPageProps = {};

const OrganizeMatchPage = (props: OrganizeMatchPageProps) => {
  const { step } = useSelector(joinMatchFormState);
  const dispatch = useDispatch();

  const renderStepperItem = (step: number) => (
    <Steps
      size="small"
      current={step}
      items={[
        {
          title: "Match",
        },
        {
          title: "Monstre",
        },
        {
          title: "Récapitulatif",
        },
        {
          title: "Terminé",
        },
      ]}
    />
  );

  const renderStepPage = (step: number) => {
    switch (step) {
      case 0:
        return <Step1 />;
      case 1:
        return <Step2 />;
      case 2:
        return <Step3 />;
      case 3:
        return <Step4 />;
      default:
        dispatch(resetJoinForm());
        return <div>default steps forms</div>;
    }
  };

  return (
    <div>
      {renderStepperItem(step)}
      <Row justify="flex-end">
        <Button auto flat onClick={() => dispatch(resetJoinForm())}>
          <p>Recommencer</p>
          <Spacer x={0.5} />
          <Trash size={15} color="white" weight="light" />
        </Button>
      </Row>
      {renderStepPage(step)}
    </div>
  );
};

export default OrganizeMatchPage;
