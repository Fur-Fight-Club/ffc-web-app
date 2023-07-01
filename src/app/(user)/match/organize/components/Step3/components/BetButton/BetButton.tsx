"use client";

import { mergeClassNames } from "@utils/main";
import { motion } from "framer-motion";
import styles from "./BetButton.module.scss";

type BetButtonProps = {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  bordered?: boolean;
};

const BetButton = ({
  className,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  bordered,
}: BetButtonProps) => {
  return (
    <motion.button
      className={mergeClassNames([
        styles.betButton,
        bordered && styles.bordered,
        className,
      ])}
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.label}>{children}</div>
    </motion.button>
  );
};

export default BetButton;
