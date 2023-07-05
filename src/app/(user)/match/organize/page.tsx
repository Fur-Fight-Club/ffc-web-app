"use client";

import { Steps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createMatchFormState } from "src/store/matches/selector";
import { resetCreateForm } from "src/store/matches/slice";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3/Step3";
import Step4 from "./components/Step4/Step4";
import Step5 from "./components/Step5/Step5";

type OrganizeMatchPageProps = {};

const OrganizeMatchPage = (props: OrganizeMatchPageProps) => {
  const { step } = useSelector(createMatchFormState);
  const dispatch = useDispatch();

  const renderStepperItem = (step: number) => (
    <Steps
      size="small"
      current={step}
      items={[
        {
          title: "Monstre",
        },
        {
          title: "Arène",
        },
        {
          title: "Mise",
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
      case 4:
        return <Step5 />;
      default:
        dispatch(resetCreateForm());
        return <div>default steps forms</div>;
    }
  };

  return (
    <div>
      {renderStepperItem(step)}
      {renderStepPage(step)}
    </div>
  );
};

export default OrganizeMatchPage;
