"use client";

import { Card, Row, Spacer, Text } from "@nextui-org/react";
import { Buildings } from "@phosphor-icons/react";
import colors from "@styles/_colors.module.scss";

type KpiCardProps = {
  color: string;
  label: string;
  amount: number;
  icon?: React.ReactNode;
  contratsColor?: string;
  unityLabel?: string;
};

const KpiCard = ({
  color = colors.white,
  icon,
  label,
  contratsColor = colors.primary,
  amount,
  unityLabel,
}: KpiCardProps) => {
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
      <Row justify="space-between" align="center">
        {icon ? (
          icon
        ) : (
          <Buildings size={65} weight="fill" color={contratsColor} />
        )}
      </Row>
      <Spacer y={0.75} />
      <Row justify="space-between" align="center">
        <Text h5 weight={"bold"} size={"$3xl"} color={colors.black}>
          {label}
        </Text>
      </Row>
      <Spacer y={0.5} />
      <Row align="center">
        <Text h5 size={"$5xl"} color={contratsColor}>
          {amount}
        </Text>
        <Spacer x={0.5} />
        {unityLabel && (
          <Text h5 color={colors.black}>
            {unityLabel}
          </Text>
        )}
      </Row>
    </Card>
  );
};

export default KpiCard;
