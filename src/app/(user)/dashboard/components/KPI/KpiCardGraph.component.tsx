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
  firstString?: string;
  secondString?: string;
}

const KpiCardsGraph: React.FunctionComponent<TemplateProps> = ({
  kpiValue,
  kpiMaxValue,
  firstString,
  secondString,
}) => {
  let percentage = Math.round((kpiValue / kpiMaxValue) * 100);

  if (kpiValue === 0 || kpiMaxValue === 0) {
    percentage = 0;
  }

  return (
    <Card variant="flat" css={{ padding: "2rem", height: "100%" }}>
      <div className={styles.main}>
        <Row>
          <Text h5 weight={"bold"} size={"$2xl"}>
            {kpiValue}{" "}
          </Text>
          <Text h5 weight={"bold"} size={"$2xl"}>
            /
          </Text>
          <Spacer x={0.1} />
          <Text h5 weight={"bold"} size={"$2xl"}>
            {" "}
            {kpiMaxValue}
          </Text>
        </Row>
        <Text h5 weight={"medium"} size={"$2xl"}>
          {firstString}
        </Text>

        <Spacer y={1} />

        <Row justify="space-between">
          <Col>
            <Text h5 weight={"bold"} size={"$2xl"}>
              {percentage}
            </Text>
            <Text h5 weight={"medium"} size={"$2xl"}>
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
                    trailColor: "#c03030",
                    pathColor: "#d57575",
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
