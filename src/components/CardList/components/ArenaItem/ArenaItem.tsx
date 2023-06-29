"use client";

import { CardListContext } from "@components/CardList/cardlist-context";
import { Text } from "@nextui-org/react";
import colors from "@styles/_colors.module.scss";
import { mergeClassNames } from "@utils/main";
import { motion } from "framer-motion";
import Image from "next/image";
import { useContext } from "react";
import { Arena } from "src/store/arenas/arenas.model";
import styles from "./ArenaItem.module.scss";

export type ArenaItemProps = {
  arena: Arena;
  onClick?: () => void;
  isSelected?: boolean;
};

const ArenaItem = ({ arena, onClick, isSelected = false }: ArenaItemProps) => {
  const { activeItem, setActiveItem } = useContext(CardListContext);

  const handleOnClick = () => {
    onClick && onClick();
    isArenaSelected ? setActiveItem({} as Arena) : setActiveItem(arena);
  };

  const isArenaSelected = arena.id === activeItem.id || isSelected;

  return (
    <motion.div
      className={mergeClassNames([
        styles.arenaItem,
        isArenaSelected && styles.arenaItemActive,
      ])}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.5 }}
      onClick={handleOnClick}
    >
      {arena.picture && (
        <div className={styles.imageContainer}>
          <Image
            src={arena.picture}
            fill
            alt={`Monster picture of ${arena?.name}`}
            style={{ objectFit: "cover", borderRadius: "0.75rem" }}
          />
        </div>
      )}
      <div className={styles.infoContainer}>
        <Text b color={isArenaSelected ? colors.white : colors.black}>
          {arena?.name}
        </Text>
        <Text color={isArenaSelected ? colors.white : colors.black}>
          {arena?.city}
        </Text>
      </div>
    </motion.div>
  );
};

export default ArenaItem;
