"use client";

import { Card, Row, Spacer, Text, Tooltip } from "@nextui-org/react";
import colors from "@styles/_colors.module.scss";
import Image from "next/image";
import { getImageByAmount } from "./utils";
import { Button } from "@components/UI/Button/Button.component";
import { Plus, Warning } from "@phosphor-icons/react";
import BuyTokenModal from "../BuyTokenModal/BuyTokenModal";
import { use, useEffect, useState } from "react";
import WithdrawModal from "../WithdrawModal/WithdrawModal";

type MyBalanceProps = {
  amount: number;
  fiat: number;
};

const MyBalance = ({ fiat, amount }: MyBalanceProps) => {
  const [visibleBuyTokenModal, setVisibleBuyTokenModal] = useState(false);
  const [visibleWithdrawModal, setVisibleWithdrawModal] = useState(false);

  const handleBuyTokenModal = () => {
    setVisibleBuyTokenModal(!visibleBuyTokenModal);
  };

  const handleWithdrawModal = () => {
    setVisibleWithdrawModal(!visibleWithdrawModal);
  };

  return (
    <Card
      style={{
        height: "100%",
        width: "100%",
        padding: "1.5rem",
        background: colors.secondaryT500,
      }}
      variant="flat"
    >
      <Row justify="flex-end">
        <Button
          onPress={() => handleBuyTokenModal()}
          style={{ padding: "none", minWidth: "0" }}
        >
          <Plus weight="bold" size={24} color="#fff5f5" />
        </Button>
      </Row>
      <Row justify="center" align="center" style={{ marginTop: "1rem" }}>
        <Text size={"$1xl"} color={colors.black}>
          Mon solde :
        </Text>
      </Row>
      <Row justify="center" align="center">
        <Text h5 size={"$6xl"} style={{ letterSpacing: "0.5rem" }}>
          {amount.toFixed(0)}{" "}
        </Text>
        <Spacer x={0.2} />
        <Image
          src={`/images/coins/${getImageByAmount(amount)}`}
          alt={`Image for amount ${amount}`}
          width={50}
          height={50}
        />
      </Row>
      <Row justify="center" align="center">
        équivaut à<Spacer x={0.2} />
        <Text weight={"bold"} color={colors.primaryT100}>
          {fiat}
        </Text>
        <Spacer x={0.2} />€
      </Row>
      <Row justify="center" align="center" style={{ marginTop: "1rem" }}>
        {amount < 10000 ? (
          <>
            <Tooltip
              content="Vous devez avoir un minimum de 10.000 crédits pour pouvoir récupérer vos fonds."
              contentColor="error"
              color="default"
              css={{ maxWidth: "20rem" }}
            >
              <Warning size={32} weight="fill" color={colors.primaryT100} />
            </Tooltip>
            <Spacer x={1} />
            <Button disabled>Récupérer mes fonds</Button>
          </>
        ) : (
          <>
            <Button
              analyticsId="Withdraw-button"
              onPress={() => handleWithdrawModal()}
            >
              Récupérer mes fonds
            </Button>
            <WithdrawModal
              visibleProp={visibleWithdrawModal}
              closeModal={handleWithdrawModal}
            />
          </>
        )}
      </Row>
      <BuyTokenModal
        visibleProp={visibleBuyTokenModal}
        closeModal={handleBuyTokenModal}
      />
    </Card>
  );
};

export default MyBalance;
