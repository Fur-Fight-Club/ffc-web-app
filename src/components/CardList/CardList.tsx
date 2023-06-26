import { Monster } from "src/store/monsters/monsters.model";
import styles from "./CardList.module.scss";

type CardListProps = {
  children?: React.ReactNode;
};

const CardList = ({ children }: CardListProps) => {
  return <div className={styles.cardList}>{children}</div>;
};

type MonsterItemProps = {
  monster?: Monster;
};

const MonsterItem = ({ monster }: MonsterItemProps) => {
  return (
    <div className={styles.monsterItem}>
      <div>MonsterItem</div>
    </div>
  );
};

CardList.MonsterItem = MonsterItem;

export default CardList;
