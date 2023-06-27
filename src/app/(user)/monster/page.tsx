"use client";

import pictureAnimation from "@assets/animations/monster/monster_default_3.json";
import { IconButton } from "@components/IconButton";
import {
  Button,
  Card,
  Col,
  Link,
  Row,
  Spacer,
  Table,
  Text,
  Tooltip,
  User,
} from "@nextui-org/react";
import { Pen, Trash } from "@phosphor-icons/react";
import colors from "@styles/_colors.module.scss";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { useDeleteMonsterMutation } from "src/store/monsters/slice";
import { convertApiTypeToLogo, weightCategoryColors } from "src/utils/utils";
import styles from "./page.module.scss";

type MonsterPageProps = {};

const MonsterPage = (props: MonsterPageProps) => {
  const router = useRouter();
  const { user } = useSelector(applicationState);

  const [deleteMonster] = useDeleteMonsterMutation();

  const columns = [
    { name: "Nom de(s) montre(s)", uid: "name" },
    { name: "MMR", uid: "mmr" },
    { name: "TYPE", uid: "monster_type" },
    { name: "CATERORIE", uid: "weight_category" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const handleDeleteMonster = (id: number) => {
    deleteMonster(id);
  };

  const renderCell = (monster, columnKey: React.Key) => {
    const cellValue = monster[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User
            squared
            src={monster?.picture}
            name={convertApiTypeToLogo(monster?.monster_type) + " " + cellValue}
            css={{ p: 0 }}
          >
            <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
              {monster?.weight}{" "}
              <Text b size={13} weight={"bold"} css={{ color: "#ff9077" }}>
                KG
              </Text>
            </Text>
          </User>
        );
      case "mmr":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue + " "}
                <Text
                  b
                  size={13}
                  weight={"bold"}
                  css={{ tt: "capitalize", color: "#ff9077" }}
                >
                  MMR
                </Text>
              </Text>
            </Row>
          </Col>
        );
      case "monster_type":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {convertApiTypeToLogo(cellValue)} {cellValue}
              </Text>
            </Row>
            <Row>
              <Text
                b
                size={13}
                weight={"bold"}
                css={{ tt: "capitalize", color: "#ff9077" }}
              >
                TYPE
              </Text>
            </Row>
          </Col>
        );
      case "weight_category":
        return (
          <Col>
            <Row>
              <Text
                b
                size={14}
                color={weightCategoryColors(cellValue)}
                css={{ tt: "capitalize" }}
              >
                {cellValue}
              </Text>
            </Row>
            <Row>
              <Text
                b
                size={13}
                weight={"bold"}
                css={{ tt: "capitalize", color: "#ff9077" }}
              >
                CATEGORIE
              </Text>
            </Row>
          </Col>
        );
      case "actions":
        return (
          <Col css={{ d: "flex" }}>
            <Tooltip content="Edit monster">
              <Link href={"/monster/" + monster?.id}>
                <IconButton
                  onClick={() => console.log("Edit monster", monster?.id)}
                >
                  <Pen size={24} color={colors.black} />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip content="delete monster">
              <IconButton onClick={() => handleDeleteMonster(monster?.id)}>
                <Trash color={colors.secondary} size={24} />
              </IconButton>
            </Tooltip>
          </Col>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div>
      <Row justify="center" css={{ m: "$7" }}>
        <Lottie className={styles.lottie} animationData={pictureAnimation} />
        <Spacer />
        <Text h2 size={"$7xl"} weight={"bold"} css={{ mb: "$4" }}>
          Vos montres
        </Text>
      </Row>
      <Card css={{ minHeight: "50%" }}>
        <Card.Body css={{ py: "$10" }}>
          <Table
            bordered
            shadow={false}
            aria-label="Example table with dynamic content & infinity pagination"
          >
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column
                  key={column.uid}
                  hideHeader={column.uid === "actions"}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body items={user.Monster}>
              {(item) => (
                <Table.Row>
                  {(columnKey) => (
                    <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                  )}
                </Table.Row>
              )}
            </Table.Body>
            <Table.Pagination shadow noMargin align="center" rowsPerPage={3} />
          </Table>
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
          <Row>
            <Col>
              <Link>
                <Button onPress={() => router.push("/monster/create")}>
                  <span className={styles.ctaLabel}>Créer un monstre</span>
                </Button>
              </Link>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default MonsterPage;
