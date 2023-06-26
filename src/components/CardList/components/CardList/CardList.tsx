"use client";

import MonsterItem, { MonsterItemProps } from "../MonsterItem";
import styles from "./CardList.module.scss";

type CardListProps = {
  children?: React.ReactNode;
};

type CardListType = React.FC<CardListProps> & {
  MonsterItem: React.FC<MonsterItemProps>;
};

const CardList: CardListType = ({ children }: CardListProps) => {
  return <div className={styles.cardList}>{children}</div>;
};

CardList.MonsterItem = MonsterItem;

export default CardList;
