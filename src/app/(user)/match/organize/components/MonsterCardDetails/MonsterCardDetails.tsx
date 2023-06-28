import { Text } from "@nextui-org/react";
import colors from "@styles/_colors.module.scss";
import { Monster } from "ffc-prisma-package/dist/client";
import styles from "./MonsterCardDetails.module.scss";

type MonsterCardDetailsProps = {
  monster?: Monster;
  onClick?: () => void;
};

const MonsterCardDetails = (props: MonsterCardDetailsProps) => {
  const { monster, onClick } = props;

  if (!monster) {
    return (
      <div className={styles.monsterCardDetailsEmpty}>
        <Text
          h3
          size={"$lg"}
          css={{ textAlign: "center" }}
          color={colors.primaryT300}
        >
          Sélectionnez un monstre
        </Text>
        <Text
          h3
          size={"$lg"}
          css={{ textAlign: "center" }}
          color={colors.primaryT300}
        >
          pour voir sa fiche combattant
        </Text>
      </div>
    );
  }

  return <div className={styles.monsterCardDetails}></div>;
};

export default MonsterCardDetails;
