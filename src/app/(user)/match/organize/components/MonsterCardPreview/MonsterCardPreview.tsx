import { Text } from "@nextui-org/react";
import colors from "@styles/_colors.module.scss";
import { Monster } from "ffc-prisma-package/dist/client";
import styles from "./MonsterCardPreview.module.scss";

type MonsterCardPreviewProps = {
  monster?: Monster | null;
};

const MonsterCardPreview = ({ monster }: MonsterCardPreviewProps) => {
  if (!monster) {
    return (
      <>
        <Text
          h3
          size={"$lg"}
          css={{ textAlign: "center" }}
          color={colors.primaryT300}
        >
          Combattant sélectionné
        </Text>
        <div className={styles.monterCardPreviewEmpty}></div>
      </>
    );
  }

  return <div>preview de {monster.name}</div>;
};

export default MonsterCardPreview;
