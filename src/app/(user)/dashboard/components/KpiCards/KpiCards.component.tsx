/* eslint-disable react/no-unescaped-entities */
"use client";
import * as React from "react";

import { Card, Col, Row, Spacer, Text } from "@nextui-org/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Coins } from "@phosphor-icons/react";
import styles from "./KpiCards.module.scss";
import { getImageByAmount } from "@utils/utils";

interface KpiCardsProps {
  transactions: [];
}

const KpiCards: React.FunctionComponent<KpiCardsProps> = ({ transactions }) => {
  const filteredTransactions = transactions.filter(
    (transaction) => transaction?.type === "OUT" && transaction?.tag === "BET"
  );

  const totalAmount = filteredTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  return (
    <Card
      style={{
        height: "100%",
        width: "100%",
        padding: "1.5rem",
      }}
      variant="flat"
    >
      <Row justify="space-between" align="center">
        <Coins size={65} color="#b91919" weight="fill" />
      </Row>
      <Spacer y={0.75} />
      <Row justify="space-between" align="center">
        <Text h5 weight={"bold"} size={"$3xl"}>
          Total des gains
        </Text>
      </Row>
      <Spacer y={0.5} />
      <Row align="center">
        <Text h5 size={"$3xl"} color="#b91919">
          {totalAmount.toFixed()}
        </Text>
        <Spacer x={0.5} />
        <img
          className={styles.credits}
          src={`/images/coins/${getImageByAmount(totalAmount)}`}
          alt={`Image for amount ${totalAmount}`}
        />
      </Row>
    </Card>
  );
};

export default KpiCards;
