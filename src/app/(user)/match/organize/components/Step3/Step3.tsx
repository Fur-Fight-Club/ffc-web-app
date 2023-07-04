"use client";

import coinImage from "@assets/images/coins/4.png";
import { Button, Row, Spacer, Text } from "@nextui-org/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { createMatchFormState } from "src/store/matches/selector";
import { setBetCreateForm, setStepCreateForm } from "src/store/matches/slice";
import styles from "./Step3.module.scss";
import BetButton from "./components/BetButton";

type Step3Props = {};

const Step3 = (props: Step3Props) => {
  const dispatch = useDispatch();
  const { monster, step, arena, bet } = useSelector(createMatchFormState);
  const { user } = useSelector(applicationState);

  const [betState, setBetState] = useState<number>(bet);
  const [isResetDisplayed, setIsResetDisplayed] = useState<boolean>(
    betState === 100 ? false : true
  );

  const hasStripeAccount =
    // @ts-ignore
    !user?.StripeAccount || !user?.StripeBankAccount || !user?.Wallet;

  const coinLabels = [-1000, -100, -10, 10, 100, 1000];

  const handleNextStep = () => {
    // TODO : Check with the API if everything is ok

    if (hasStripeAccount) {
      toast.error(
        "Vous devez avoir enregistré un compte bancaire pour pouvoir miser"
      );
      return;
    }

    dispatch(setBetCreateForm(betState));
    dispatch(setStepCreateForm(3));
    toast.success("Mise enregistrée");
  };

  const handleStepBack = () => {
    dispatch(setStepCreateForm(1));
  };

  const handleBetIsAt100CoinsMinimum = (checkedBet: number) =>
    checkedBet >= 100;

  // TODO : check if the user has enough money
  const handleUserHasEnoughCoins = (checkedBet: number) => checkedBet <= 10000;

  const isButtonClickable = (betToAdd: number) =>
    handleBetIsAt100CoinsMinimum(betState + betToAdd) &&
    handleUserHasEnoughCoins(betState + betToAdd);

  const handleSetBet = (betToAdd: number) => {
    if (!handleBetIsAt100CoinsMinimum(betState + betToAdd)) {
      toast.error("Vous devez miser au moins 100 jetons");
      return;
    }

    if (!handleUserHasEnoughCoins(betState + betToAdd)) {
      toast.error("Vous n'avez pas assez de jetons");
      return;
    }

    setBetState(betState + betToAdd);
  };

  useEffect(() => {
    setIsResetDisplayed(betState === 100 ? false : true);
  }, [betState]);

  return (
    <div style={{ height: "80vh" }}>
      <div className={styles.step3}>
        <Row justify="center" align="center">
          <Text size={"$8xl"}>{betState}</Text>
          <Spacer x={1} />
          <Image src={coinImage.src} height={75} width={75} alt="coin" />
        </Row>
        <Spacer y={1} />
        <Row justify="space-evenly" css={{ width: "50%" }}>
          {coinLabels.map((coinLabel, i) => (
            <BetButton
              key={i}
              onClick={() => handleSetBet(coinLabel)}
              disabled={isButtonClickable(coinLabel) ? false : true}
              bordered={coinLabel < 0 ? true : false}
            >
              {coinLabel > 0 && "+"}
              {coinLabel}
            </BetButton>
          ))}
        </Row>
        <Spacer y={3} />
        <Row justify="center">
          <motion.div
            animate={
              isResetDisplayed
                ? { opacity: 1, scale: 1, display: "block" }
                : {
                    opacity: 0,
                    scale: 0,
                    transitionEnd: {
                      display: "none",
                    },
                  }
            }
          >
            <Button bordered onClick={() => setBetState(100)}>
              Reset
            </Button>
          </motion.div>
        </Row>
      </div>
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

export default Step3;
