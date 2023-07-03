"use client";

import { Button, Card, Col, Row, Spacer, Text } from "@nextui-org/react";
import { convertApiTypeToType } from "@utils/utils";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { createMatchFormState } from "src/store/matches/selector";
import { setStepCreateForm } from "src/store/matches/slice";

type Step4Props = {};

const Step4 = (props: Step4Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { monster, step, arena, bet, date } = useSelector(createMatchFormState);

  const handleNextStep = () => {
    // TODO : Go to payment page
  };

  const handleStepBack = () => {
    dispatch(setStepCreateForm(2));
  };

  return (
    <div style={{ height: "80vh" }}>
      <Spacer y={1} />
      <Text b size={"$3xl"}>
        {"Récapitulatif"}
      </Text>
      <Col>
        <Spacer y={1} />
        <Text b size={"$1xl"}>
          1 - Monstre
        </Text>
        <Spacer y={0.5} />
        <Card css={{ padding: "1rem" }}>
          <Col>
            <Text>Nom : {monster?.name}</Text>
            <Text>MMR : {monster?.mmr}</Text>
            <Text>Poids : {monster?.weight}</Text>
            <Text>Category : {monster?.weight_category}</Text>
            {/* @ts-ignore */}
            <Text>Type : {convertApiTypeToType(monster?.monster_type)}</Text>
          </Col>
        </Card>
        <Spacer y={1} />
        <Text b size={"$1xl"}>
          2 - Arène
        </Text>
        <Spacer y={0.5} />
        <Card css={{ padding: "1rem" }}>
          <Col>
            <Text>Nom : {arena?.name}</Text>
            <Text>
              Adresse : {arena?.address}, {arena?.zipcode} {arena?.city},{" "}
              {arena?.country}
            </Text>
            {/* @ts-ignore */}
            <Text>Date : {date}</Text>
          </Col>
        </Card>
        <Spacer y={1} />
        <Text b size={"$1xl"}>
          3 - Mise
        </Text>
        <Spacer y={0.5} />
        <Card css={{ padding: "1rem" }}>
          <Col>
            <Text>Mise : {bet}</Text>
          </Col>
        </Card>
      </Col>
      <Row justify="flex-end">
        <Button bordered onClick={handleStepBack}>
          Retour
        </Button>
        <Spacer x={0.5} />
        <Button onClick={handleNextStep}>Suivant</Button>
      </Row>
    </div>
  );
};

export default Step4;
