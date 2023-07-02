import { Divider, Row, Spacer, Text } from "@nextui-org/react";
import colors from "@styles/_colors.module.scss";
import { convertApiTypeToType } from "@utils/utils";
import { Monster } from "ffc-prisma-package/dist/client";
import Image from "next/image";
import styles from "./MonsterCardCreate.module.scss";

type MonsterCardCreateProps = {
  monster?: null;
};

const MonsterCardCreate = ({ monster }: MonsterCardCreateProps) => {
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
        <Image
          src={monster?.picture}
          fill
          alt={`Monster picture of ${monster?.name}`}
          style={{ objectFit: "cover", borderRadius: "0.75rem 0.75rem 0 0" }}
        />
      </div>
      <div className={styles.informationContainer}>
        <Text h2 weight={"bold"} color={colors.secondary}>
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
            {convertApiTypeToType(monster.monster_type)}
          </Text>
        </Row>
        <Row align="stretch">
          <Text h4 size={"$lg"} weight={"medium"}>
            {"Poids :"}
          </Text>
          <Spacer x={0.5} />
          <Text size={"$lg"} weight={"medium"}>
            {monster.weight} kg
          </Text>
        </Row>
        <Row align="stretch">
          <Text h4 size={"$lg"} weight={"medium"}>
            {"Catégorie :"}
          </Text>
          <Spacer x={0.5} />
          <Text size={"$lg"} weight={"medium"}>
            {monster.weight_category}
          </Text>
        </Row>
      </div>
    </div>
  );
};

export default MonsterCardCreate;
