import { Badge, Row } from '@nextui-org/react';
import styles from './BetListItem.module.scss';

type BetListItemProps = {
  children?: React.ReactNode;
};

const BetListItem = ({ children }: BetListItemProps) => {
  return (
    <div className={styles.betListItem}>
      <div className={styles.monsterCard}>
        <div className={styles.monster}></div>
        <Row>
          <Badge>100 kg</Badge>
          <Badge>100 MMR</Badge>
        </Row>
      </div>
      <span>VS</span>
      <div className={styles.monsterCard}>
        <div className={styles.monster}></div>
        <Row>
          <Badge>100 kg</Badge>
          <Badge>100 MMR</Badge>
        </Row>
      </div>
    </div>
  );
};

export default BetListItem;
