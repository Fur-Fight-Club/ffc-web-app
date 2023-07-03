"use client";

import { Steps } from "antd";
import { useSelector } from "react-redux";
import { createMatchFormState } from "src/store/matches/selector";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3/Step3";
import Step4 from "./components/Step4/Step4";

type OrganizeMatchPageProps = {};

const OrganizeMatchPage = (props: OrganizeMatchPageProps) => {
  const { step } = useSelector(createMatchFormState);

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
          title: "Paiement",
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
