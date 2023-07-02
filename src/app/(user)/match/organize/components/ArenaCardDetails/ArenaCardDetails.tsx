"use client";

import { Card, Col, Row, Text } from "@nextui-org/react";
import colors from "@styles/_colors.module.scss";
import { useSelector } from "react-redux";
import { Arena } from "src/store/arenas/arenas.model";
import { createMatchFormState } from "src/store/matches/selector";
import styles from "./ArenaCardDetails.module.scss";

type ArenaCardDetailsProps = {
  arena: Arena | null;
};

const ArenaCardDetails = ({ arena }: ArenaCardDetailsProps) => {
  const {
    monster,
    step,
    arena: arenaStore,
    bet,
  } = useSelector(createMatchFormState);

  if (!arena)
    return (
      <div className={styles.arenaCardDetailsEmpty}>
        <Text
          h3
          size={"$lg"}
          css={{ textAlign: "center" }}
          color={colors.primaryT300}
        >
          Sélectionnez une arène
        </Text>
      </div>
    );

  return (
    <Card css={{ w: "100%", h: "70%" }}>
      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
          <Text size={12} weight="bold" transform="uppercase" color="#9E9E9E">
            à {arena?.city}
          </Text>
          <Text h3 color="white">
            {arena?.name}
          </Text>
        </Col>
      </Card.Header>
      <Card.Body css={{ p: 0 }}>
        <div style={{ height: "100%", position: "relative" }}>
          <Card.Image
            // @ts-ignore
            src={arena?.picture}
            objectFit="cover"
            width="100%"
            height="100%"
            alt="Relaxing app background"
          />
        </div>
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          bgBlur: "#0f111466",
          borderTop: "$borderWeights$light solid $gray800",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row>
          <Col>
            <Row>
              <Col span={3}>
                <Card.Image
                  src="https://nextui.org/images/breathing-app-icon.jpeg"
                  css={{ bg: "black", br: "50%" }}
                  height={40}
                  width={40}
                  alt="Breathing app icon"
                />
              </Col>
              <Col>
                <Text color="#d1d1d1" size={12}>
                  {arena?.address}
                </Text>
                <Text color="#d1d1d1" size={12}>
                  {arena?.zipcode}, {arena?.city}, {arena?.country}
                </Text>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row justify="flex-end"></Row>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default ArenaCardDetails;
