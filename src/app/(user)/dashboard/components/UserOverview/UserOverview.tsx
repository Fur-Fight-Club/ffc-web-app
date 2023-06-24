import { Card } from "@nextui-org/react";

import Link from "next/link";
import styles from "./UserOverview.module.scss";

type UserOverviewProps = {
  fullname: string;
  inscriptionDate: string;
};

const UserOverview = ({ fullname, inscriptionDate }: UserOverviewProps) => {
  const test = () => {
    console.log("test onclick");
  };

  return (
    <Card variant="flat" style={{ height: "100%" }} isHoverable>
      <div className={styles.userContainer}>
        <div className={styles.userAvatar}>
          <div className={styles.avatar}></div>
        </div>
        <div className={styles.userInformation}>
          <h3>{fullname}</h3>
          <p>Inscrit depuis le :</p>
          <Link href="/profile">voir profile</Link>
        </div>
      </div>
    </Card>
  );
};

export default UserOverview;
