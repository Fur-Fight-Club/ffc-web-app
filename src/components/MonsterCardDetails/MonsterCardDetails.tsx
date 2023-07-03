import { Divider, Row, Spacer, Text } from "@nextui-org/react";
import colors from "@styles/_colors.module.scss";
import { convertApiTypeToType } from "@utils/utils";
import Image from "next/image";
import styles from "./MonsterCardDetails.module.scss";

type MonsterCardDetailsProps = {
  monster?: null;
};

const MonsterCardDetails = ({ monster }: MonsterCardDetailsProps) => {
  if (!monster) {
    return (
      <div className={styles.monsterCardDetailsEmpty}>
        <Text
          h3
          size={"$lg"}
          css={{ textAlign: "center" }}
          color={colors.primaryT300}
        >
          Commencez à créer
        </Text>
        <Text
          h3
          size={"$lg"}
          css={{ textAlign: "center" }}
          color={colors.primaryT300}
        >
          votre monstre
        </Text>
      </div>
    );
  }

  return (
    <div className={styles.monsterCardDetails}>
      <div className={styles.imageContainer}>
        {/* @ts-ignore */}
        {(monster?.picture !== null || monster?.picture !== "") && (
          <Image
            // @ts-ignore
            src={monster?.picture}
            fill
            // @ts-ignore
            alt={`Monster picture of ${monster?.name}`}
            style={{ objectFit: "cover", borderRadius: "0.75rem 0.75rem 0 0" }}
          />
        )}
      </div>
      <div className={styles.informationContainer}>
        <Text h2 weight={"bold"} color={colors.secondary}>
          {/* @ts-ignore */}
          {monster.name}
        </Text>
        <Divider y={1} />
        <Spacer y={0.5} />
        <Row align="stretch">
          <Text h4 size={"$lg"} weight={"medium"}>
            Type :
          </Text>
          <Spacer x={0.5} />
          <Text size={"$lg"} weight={"medium"}>
            {/* @ts-ignore */}
            {convertApiTypeToType(monster.monster_type)}
          </Text>
        </Row>
        <Row align="stretch">
          <Text h4 size={"$lg"} weight={"medium"}>
            {"Poids :"}
          </Text>
          <Spacer x={0.5} />
          <Text size={"$lg"} weight={"medium"}>
            {/* @ts-ignore */}
            {monster.weight} kg
          </Text>
        </Row>
        <Row align="stretch">
          <Text h4 size={"$lg"} weight={"medium"}>
            {"Catégorie :"}
          </Text>
          <Spacer x={0.5} />
          <Text size={"$lg"} weight={"medium"}>
            {/* @ts-ignore */}
            {monster.weight_category}
          </Text>
        </Row>
      </div>
    </div>
  );
};

export default MonsterCardDetails;
