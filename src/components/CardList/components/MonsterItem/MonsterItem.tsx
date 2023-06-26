"use client";

import { Monster } from "src/store/monsters/monsters.model";
import styles from "./MonsterItem.module.scss";

export type MonsterItemProps = {
  monster?: Monster;
};

const MonsterItem = ({ monster }: MonsterItemProps) => {
  return (
    <div className={styles.monsterItem}>
      <div>MonsterItem</div>
    </div>
  );
};

export default MonsterItem;
