"use client";

import { Spacer, Text } from "@nextui-org/react";
import colors from "@styles/_colors.module.scss";
import { convertApiTypeToLogo } from "@utils/main";
import { motion } from "framer-motion";
import Image from "next/image";
import { Monster } from "src/store/monsters/monsters.model";
import styles from "./MonsterItem.module.scss";

export type MonsterItemProps = {
  monster: Monster;
};

const MonsterItem = ({ monster }: MonsterItemProps) => {
  return (
    <motion.div className={styles.monsterItem} whileHover={{ scale: 1.05 }}>
      <div className={styles.imageContainer}>
        <Image
          src={monster?.picture}
          fill
          alt={`Monster picture of ${monster?.name}`}
          style={{ objectFit: "cover", borderRadius: "0.75rem" }}
        />
      </div>
      <div className={styles.infoContainer}>
        <Text b>{monster?.name}</Text>
        <Text>
          {monster?.mmr}
          <Spacer x={0.2} inline />
          <Text b color={colors.secondary}>
            MMR
          </Text>
        </Text>
      </div>
      <div className={styles.typeContainer}>
        <div className={styles.type}>
          {convertApiTypeToLogo(monster?.monster_type)}
        </div>
      </div>
    </motion.div>
  );
};

export default MonsterItem;
