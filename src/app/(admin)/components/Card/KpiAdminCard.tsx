"use client";

import { Card, Text } from "@nextui-org/react";
import { numbers } from "@utils/number.utils";

type KpiAdminCardProps = {
  label: string;
  amount: any;
  unityLabel?: string;
};

export const KpiAdminCard = ({
  label,
  amount,
  unityLabel,
}: KpiAdminCardProps) => {
  return (
    <Card>
      <Card.Body
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          h3
          css={{
            color: "#ff4b4b",
            fontSize: "3rem",
            fontWeight: 900,
          }}
        >
          {numbers.suffix(amount)} {unityLabel}
        </Text>
        <Text
          css={{
            color: "#464646",
            fontSize: ".75rem",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          {label}
        </Text>
      </Card.Body>
    </Card>
  );
};
