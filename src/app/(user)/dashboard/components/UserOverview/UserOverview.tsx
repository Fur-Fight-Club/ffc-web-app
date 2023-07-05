import {
  Avatar,
  Card,
  Row,
  Text,
  Spacer,
  Button,
  Image,
  Col,
} from "@nextui-org/react";
import { getInitials } from "src/utils/utils";
import styles from "./UserOverview.module.scss";
import { useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { walletState } from "src/store/wallet/selector";
import { useRouter } from "next/navigation";
import { Ghost, User } from "@phosphor-icons/react";
import { getImageByAmount } from "src/utils/utils";

type UserOverviewProps = {};

const UserOverview = ({}: UserOverviewProps) => {
  const { user } = useSelector(applicationState);
  const wallet = useSelector(walletState);

  const router = useRouter();

  return (
    <Card variant="flat" style={{ height: "100%" }}>
      <Card.Body>
        <Row
          justify="center"
          align="center"
          css={{ height: "100%", width: "100%" }}
        >
          <Avatar
            bordered
            size="xl"
            as="button"
            color="primary"
            textColor="white"
            text={getInitials(user.firstname, user.lastname)}
          />
          <Spacer x={0.5} />
          <Text h3>{`${user.firstname} ${user.lastname}`}</Text>
        </Row>
        <Row
          justify="center"
          align="center"
          css={{ height: "100%", width: "100%" }}
        >
          <Row justify="center" align="center" css={{ m: 0 }}>
            <Text weight="bold" size="$2xl">
              {wallet.credits.toFixed(0)}{" "}
            </Text>
            <Spacer x={0.2} />
            {/* eslint-disable */}
            <img
              className={styles.credits}
              src={`/images/coins/${getImageByAmount(wallet.credits)}`}
              alt={`Image for amount ${wallet.credits}`}
            />
          </Row>
          <Row justify="center" align="center">
            <Text weight="bold" size="$2xl">
              {user.Monster.length}{" "}
            </Text>
            <Spacer x={0.2} />
            <Ghost weight="bold" size={25} />
          </Row>
        </Row>
      </Card.Body>
      <Card.Footer>
        <Row justify="flex-end" align="flex-end">
          <Button icon={<User />} auto onPress={() => router.push("/profile")}>
            Profile
          </Button>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default UserOverview;
