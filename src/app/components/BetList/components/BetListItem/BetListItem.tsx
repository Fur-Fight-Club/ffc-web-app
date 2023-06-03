import { Badge, Row } from '@nextui-org/react';
import { mergeClassNames } from 'src/utils/main';
import styles from './BetListItem.module.scss';

type BetListItemProps = {
  className?: string;
};

const BetListItem = ({ className }: BetListItemProps) => {
  return (
    <div className={mergeClassNames([styles.betListItem, className])}>
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
