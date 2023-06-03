import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { mergeClassNames } from 'src/utils/main';
import styles from './BetList.module.scss';

type BetListProps = {
  children?: React.ReactNode;
  className?: string;
};

const BetList = ({ children, className }: BetListProps) => {
  return (
    <div className={mergeClassNames([styles.betList, className])}>
      <div className={styles.header}>
        {/* TODO : Make calendar component here */}
        <div className={styles.calendar}></div>
        <div>Samedi 3 janvier</div>
        {/* TODO : Make IconButton component here */}
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
