"use client";

import { Card, Row, Spacer, Text } from "@nextui-org/react";
import colors from "@styles/_colors.module.scss";
import Image from "next/image";
import { getImageByAmount } from "./utils";
import { Button } from "@components/UI/Button/Button.component";
import { Plus } from "@phosphor-icons/react";
import BuyTokenModal from "../BuyTokenModal/BuyTokenModal";
import { use, useEffect, useState } from "react";

type MyBalanceProps = {
  amount: number;
  fiat: number;
};

const MyBalance = ({ fiat, amount }: MyBalanceProps) => {
  const [visible, setVisible] = useState(false);

  const handleModal = () => {
    setVisible(!visible);
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
          onPress={() => handleModal()}
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
          {amount}{" "}
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
        <Button analyticsId="createMonster-button">Récupérer mes fonds</Button>
      </Row>
      <BuyTokenModal visibleProp={visible} closeModal={handleModal} />
    </Card>
  );
};

export default MyBalance;
