/* eslint-disable react/no-unescaped-entities */
"use client";
import * as React from "react";

import { Card, Col, Row, Spacer, Text } from "@nextui-org/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./kpiCardGraph.module.scss";

interface TemplateProps {
  kpiValue: number;
  kpiMaxValue: number;
  kpiButtonRoute?: string;
  firstString?: string;
  secondString?: string;
}

const KpiCardsGraph: React.FunctionComponent<TemplateProps> = ({
  kpiValue,
  kpiMaxValue,
  kpiButtonRoute,
  firstString,
  secondString,
}) => {
  const percentage = Math.round((kpiValue / kpiMaxValue) * 100);

  return (
    <Card
      variant="flat"
      css={{ padding: "2rem", height: "100%", background: "#FAF8F4" }}
    >
      <div className={styles.main}>
        <Row>
          <Text weight="semibold" size={30}>
            {kpiValue}{" "}
          </Text>
          <Text weight="semibold" size={30}>
            /
          </Text>
          <Text weight="semibold" size={30} css={{ color: "#9B9488" }}>
            {" "}
            {kpiMaxValue}
          </Text>
        </Row>
        <Text size={15} css={{ color: "#7D7B88" }}>
          {firstString}
        </Text>

        <Spacer y={1} />

        <Row justify="space-between">
          <Col>
            <Text weight="semibold" size={30}>
              {percentage}
            </Text>
            <Text size={15} css={{ color: "#7D7B88" }}>
              % {secondString}
            </Text>
          </Col>

          <Col
            css={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Row justify="center">
              <div className={styles.chart}>
                <CircularProgressbar
                  value={percentage}
                  strokeWidth={50}
                  counterClockwise
                  styles={buildStyles({
                    trailColor: "#F5EFDF",
                    pathColor: "#DCCEB5",
                    strokeLinecap: "butt",
                  })}
                />
              </div>
            </Row>
          </Col>
        </Row>
        <Spacer y={1} />
      </div>
    </Card>
  );
};

export default KpiCardsGraph;
