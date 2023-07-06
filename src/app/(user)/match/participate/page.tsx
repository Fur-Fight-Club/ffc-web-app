"use client";

import { Steps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { joinMatchFormState } from "src/store/matches/selector";
import { resetJoinForm } from "src/store/matches/slice";

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
        return <div>step 1 JOIN</div>;
      default:
        dispatch(resetJoinForm());
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
