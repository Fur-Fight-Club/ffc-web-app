"use client";

import { CardListContext } from "@components/CardList/cardlist-context";
import { Text } from "@nextui-org/react";
import colors from "@styles/_colors.module.scss";
import { mergeClassNames } from "@utils/main";
import { motion } from "framer-motion";
import { useContext } from "react";
import { Match } from "src/store/matches/matches.model";
import styles from "./MatchItem.module.scss";

export type MatchItemProps = {
  match: Match;
  onClick?: () => void;
  isSelected?: boolean;
};

const MatchItem = ({ match, onClick, isSelected = false }: MatchItemProps) => {
  const { activeItem, setActiveItem } = useContext(CardListContext);

  const handleOnClick = () => {
    onClick && onClick();
    isMatchSelected ? setActiveItem({} as Match) : setActiveItem(match);
  };

  const isMatchSelected = match.id === activeItem.id || isSelected;

  return (
    <motion.div
      className={mergeClassNames([
        styles.MatchItem,
        isMatchSelected && styles.arenaItemActive,
      ])}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.5 }}
      onClick={handleOnClick}
    >
      <div className={styles.infoContainer}>
        <Text b color={isMatchSelected ? colors.white : colors.black}>
          pouet
        </Text>
        <Text color={isMatchSelected ? colors.white : colors.black}>
          monster {match.Monster1.name}
        </Text>
      </div>
    </motion.div>
  );
};

export default MatchItem;
