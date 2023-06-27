"use client";

import { Card, Col, Row, Spacer, Text } from "@nextui-org/react";
import colors from "@styles/_colors.module.scss";
import Image from "next/image";
import { getImageByAmount } from "./utils";
import { Button } from "@components/UI/Button/Button.component";
import { Plus } from "@phosphor-icons/react";

type MyBalanceProps = {
  color: string;
  label: string;
  amount: number;
  icon?: React.ReactNode;
  contratsColor?: string;
  unityLabel?: string;
};

const MyBalance = ({
  color = colors.white,
  icon,
  label,
  contratsColor = colors.primary,
  amount,
  unityLabel,
}: MyBalanceProps) => {
  return (
    <Card
      style={{
        height: "100%",
        width: "100%",
        background: color,
        padding: "1.5rem",
      }}
      variant="flat"
    >
      <Row justify="flex-end">
        <Button
          analyticsId="createMonster-button"
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
        <Text h5 size={"$5xl"} color={contratsColor}>
          {amount}{" "}
        </Text>
        <Spacer x={0.2} />
        <Image
          src={`/images/coins/${getImageByAmount(amount)}`}
          alt={`Image for amount ${amount}`}
          width={75}
          height={75}
        />
      </Row>
      <Row justify="center" align="center">
        équivaut à<Spacer x={0.2} />
        <Text weight={"bold"} color={colors.primaryT100}>
          37.12
        </Text>
        <Spacer x={0.2} />€
      </Row>
      <Row justify="center" align="center" style={{ marginTop: "1rem" }}>
        <Button analyticsId="createMonster-button">Récupérer mes fonds</Button>
      </Row>
    </Card>
  );
};

export default MyBalance;
