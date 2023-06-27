"use client";

import { CardListContext } from "@components/CardList/cardlist-context";
import { Spacer, Text } from "@nextui-org/react";
import colors from "@styles/_colors.module.scss";
import { convertApiTypeToLogo, mergeClassNames } from "@utils/main";
import { motion } from "framer-motion";
import Image from "next/image";
import { useContext } from "react";
import { Monster } from "src/store/monsters/monsters.model";
import styles from "./MonsterItem.module.scss";

export type MonsterItemProps = {
  monster: Monster;
  onClick?: () => void;
};

const MonsterItem = ({ monster, onClick }: MonsterItemProps) => {
  const { activeMonster, setActiveMonster } = useContext(CardListContext);

  const handleOnClick = () => {
    onClick && onClick();
    setActiveMonster(monster);
  };

  const isMonsterSelected = monster.id === activeMonster.id;

  return (
    <motion.div
      className={mergeClassNames([
        styles.monsterItem,
        isMonsterSelected && styles.monsterItemActive,
      ])}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.5 }}
      onClick={handleOnClick}
    >
      <div className={styles.imageContainer}>
        <Image
          src={monster?.picture}
          fill
          alt={`Monster picture of ${monster?.name}`}
          style={{ objectFit: "cover", borderRadius: "0.75rem" }}
        />
      </div>
      <div className={styles.infoContainer}>
        <Text b color={isMonsterSelected ? colors.white : colors.black}>
          {monster?.name}
        </Text>
        <Text color={isMonsterSelected ? colors.white : colors.black}>
          {monster?.mmr}
          <Spacer x={0.2} inline />
          <Text b color={isMonsterSelected ? colors.white : colors.secondary}>
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
