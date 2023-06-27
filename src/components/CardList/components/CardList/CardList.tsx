"use client";

import { CardListContext } from "@components/CardList/cardlist-context";
import { mergeClassNames } from "@utils/main";
import { useState } from "react";
import { Monster } from "src/store/monsters/monsters.model";
import MonsterItem, { MonsterItemProps } from "../MonsterItem";
import styles from "./CardList.module.scss";

type CardListProps = {
  children?: React.ReactNode;
  className?: string;
};

type CardListType = React.FC<CardListProps> & {
  MonsterItem: React.FC<MonsterItemProps>;
};

const CardList: CardListType = ({ children, className }: CardListProps) => {
  const [activeMonster, setActiveMonster] = useState<Monster>({} as Monster);

  return (
    <CardListContext.Provider value={{ activeMonster, setActiveMonster }}>
      <div className={mergeClassNames([styles.cardList, className])}>
        {children}
      </div>
    </CardListContext.Provider>
  );
};

CardList.MonsterItem = MonsterItem;

export default CardList;
