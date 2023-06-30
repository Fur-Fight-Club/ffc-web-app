"use client";
import { Card, Col, Row, Text } from "@nextui-org/react";
import { Monster } from "src/store/monsters/monsters.model";
import { parseWheightCategory } from "src/utils/utils";

export const MonsterCard = (props: { monster: Monster }) => {
  const { monster } = props;

  return (
    <Card css={{ w: "100%", h: "400px" }}>
      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
          <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
            Nom
          </Text>
          <Text h3 color="black">
            {monster?.name}
          </Text>
        </Col>
      </Card.Header>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={monster?.picture}
          width="100%"
          height="100%"
          objectFit="cover"
          alt="Card example background"
        />
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          bgBlur: "#ffffff66",
          borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row>
          <Col>
            <Text color="#000" size={12}>
              Categorie: {parseWheightCategory(monster?.weight_category)}
            </Text>
            <Text color="#000" size={12}>
              Poids: {monster?.weight} KG
            </Text>
          </Col>
          <Col>
            <Text color="#000" size={12}>
              Type: {monster?.monster_type}
            </Text>
            <Text color="#000" size={12}>
              MMR: {monster?.mmr}
            </Text>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};
