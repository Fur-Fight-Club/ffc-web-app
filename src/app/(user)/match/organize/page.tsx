"use client";

import { useSelector } from "react-redux";
import { createMatchFormState } from "src/store/matches/selector";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";

type OrganizeMatchPageProps = {};

const OrganizeMatchPage = (props: OrganizeMatchPageProps) => {
  const { monster, step, arena, bet } = useSelector(createMatchFormState);

  switch (step) {
    case 0:
      return <Step1 />;
    case 1:
      return <Step2 />;
    default:
      return <div>default steps forms</div>;
  }
};

export default OrganizeMatchPage;
