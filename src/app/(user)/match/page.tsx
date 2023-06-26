"use client";

import { Spacer, Text } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import colors from "src/styles/_colors.module.scss";
import styles from "./page.module.scss";

type MatchPageProps = {};

const MatchPage = (props: MatchPageProps) => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.leftPanel}
        onClick={() => router.push("/match/participate")}
        initial={{
          x: "-100%",
        }}
        animate={{ x: 0 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className={styles.textContent}>
          <Text h2 size={"$6xl"} weight={"black"} color={colors.white}>
            Participez
          </Text>
          <Text h3 size={"$xl"} weight={"black"} color={colors.white}>
            Défier un adversaire sur son propre terrain
          </Text>
        </div>
      </motion.div>
      <Spacer x={1} />
      <motion.div
        className={styles.rightPanel}
        onClick={() => router.push("/match/organize")}
        initial={{
          x: "100%",
        }}
        animate={{ x: 0 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className={styles.textContent}>
          <Text h2 size={"$6xl"} weight={"black"} color={colors.primary}>
            Organiser
          </Text>
          <Text h3 size={"$xl"} weight={"black"} color={colors.primary}>
            Décidez du lieu, date et montant à gagner
          </Text>
        </div>
      </motion.div>
    </div>
  );
};

export default MatchPage;
