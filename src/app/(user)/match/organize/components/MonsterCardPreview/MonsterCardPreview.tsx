import { Text } from "@nextui-org/react";
import colors from "@styles/_colors.module.scss";
import { convertApiTypeToLogoOnly } from "@utils/utils";
import { Monster } from "ffc-prisma-package/dist/client";
import Image from "next/image";
import styles from "./MonsterCardPreview.module.scss";

type MonsterCardPreviewProps = {
  monster?: Monster | null;
};

const MonsterCardPreview = ({ monster }: MonsterCardPreviewProps) => {
  if (!monster) {
    return (
      <>
        <Text
          h3
          size={"$lg"}
          css={{ textAlign: "center" }}
          color={colors.primaryT300}
        ></Text>
        <div className={styles.monterCardPreviewEmpty}></div>
      </>
    );
  }

  return (
    <div className={styles.monsterCardPreview}>
      <Image
        src={monster?.picture}
        fill
        alt={`Monster picture of ${monster?.name}`}
        style={{ objectFit: "cover", borderRadius: "0.75rem" }}
      />
      <div className={styles.informationContainer}>
        <Text size={"$4xl"} weight={"bold"}>
          {monster.name}
        </Text>
        <Text size={"$lg"} weight={"medium"} className={styles.mmrLabel}>
          {monster.mmr} MMR
        </Text>
      </div>
      <div className={styles.typeIcon}>
        <Text size={"$3xl"}>
          {convertApiTypeToLogoOnly(monster.monster_type)}
        </Text>
      </div>
    </div>
  );
};

export default MonsterCardPreview;
