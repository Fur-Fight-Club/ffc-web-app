"use client";

import React from "react";
import { Text, Card, Button } from "@nextui-org/react";
import colors from "@styles/_colors.module.scss";
import { Monster } from "ffc-prisma-package/dist/client";
import Image from "next/image";
import styles from "./BestMonsterMmr.module.scss";
import { convertApiTypeToLogoOnly } from "@utils/utils";
import { useRouter } from "next/navigation";

type BestMonsterMmrProps = {
  monster?: Monster | null;
};

const BestMonsterMmr = ({ monster }: BestMonsterMmrProps) => {
  const router = useRouter;

  if (!monster) {
    return (
      <>
        <Text
          h3
          style={{ height: "100%" }}
          css={{ textAlign: "center" }}
          color={colors.primaryT300}
        ></Text>
        <div className={styles.monterCardPreviewEmpty}>
          <Button auto onPress={() => router.push("/profile")}>
            Créer mon premier monstre
          </Button>
        </div>
      </>
    );
  }

  return (
    <Card variant="flat" style={{ height: "100%" }}>
      <Card.Header>
        <Text size={"$4xl"} weight={"bold"} color="#deb829">
          🏆 Meilleure monstre
        </Text>
      </Card.Header>
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
          {monster.mmr} MMR 🏆
        </Text>
      </div>
      <div className={styles.typeIcon}>
        <Text size={"$3xl"}>
          {convertApiTypeToLogoOnly(monster.monster_type)}
        </Text>
      </div>
    </Card>
  );
};

export default BestMonsterMmr;
