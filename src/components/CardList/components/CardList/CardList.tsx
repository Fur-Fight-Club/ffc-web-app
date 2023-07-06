"use client";

import {
  CardListContext,
  ItemPayload,
} from "@components/CardList/cardlist-context";
import { mergeClassNames } from "@utils/main";
import { useState } from "react";
import { ArenaItemProps } from "../ArenaItem";
import ArenaItem from "../ArenaItem/";
import MatchItem, { MatchItemProps } from "../MatchItem";
import MonsterItem, { MonsterItemProps } from "../MonsterItem";
import styles from "./CardList.module.scss";

type CardListProps = {
  children?: React.ReactNode;
  className?: string;
};

type CardListType = React.FC<CardListProps> & {
  MonsterItem: React.FC<MonsterItemProps>;
  ArenaItem: React.FC<ArenaItemProps>;
  MatchItem: React.FC<MatchItemProps>;
};

const CardList: CardListType = ({ children, className }: CardListProps) => {
  const [activeItem, setActiveItem] = useState<ItemPayload>({} as ItemPayload);

  return (
    <CardListContext.Provider value={{ activeItem, setActiveItem }}>
      <div className={mergeClassNames([styles.cardList, className])}>
        {children}
      </div>
    </CardListContext.Provider>
  );
};

CardList.MonsterItem = MonsterItem;
CardList.ArenaItem = ArenaItem;
CardList.MatchItem = MatchItem;

export default CardList;
