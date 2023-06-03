import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import styles from './BetList.module.scss';

type BetListProps = {
  children?: React.ReactNode;
};

const BetList = ({ children }: BetListProps) => {
  return (
    <div className={styles.betList}>
      <div className={styles.header}>
        <div className={styles.calendar}></div>
        <div>Samedi 3 janvier</div>
        <span>
          <motion.button whileHover={{ scale: 1.3 }}>
            <CaretLeft size={32} weight="bold" color="black" />
          </motion.button>
          <motion.button whileHover={{ scale: 1.3 }}>
            <CaretRight size={32} weight="bold" color="black" />
          </motion.button>
        </span>
      </div>
      <div className={styles.betListContent}>{children}</div>
    </div>
  );
};

export default BetList;
