"use client";
import {
  Button,
  Card,
  Col,
  Image,
  Link,
  Row,
  StyledBadge,
  Table,
  Text,
  Tooltip,
  User,
} from "@nextui-org/react";
import styles from "./MyMonstersCard.module.scss";
import { IconButton } from "@components/IconButton";
import { convertApiTypeToLogo } from "./utils";

export default function MyMonstersCard() {
  const columns = [
    { name: "Nom de(s) montre(s)", uid: "name" },
    { name: "MMR", uid: "mmr" },
    // { name: "CATERORIE", uid: "weight_category" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const monsters = [
    {
      id: 1,
      name: "Zola",
      mmr: 1000,
      weight: 3.7,
      monster_type: "ELEMENTARY",
      weight_category: "A_FINE_BOI",
      picture: "https://i.imgur.com/ZC77E1t.jpg",
    },
    {
      id: 2,
      name: "Big Phat Chonk",
      mmr: 1000,
      weight: 500,
      monster_type: "MAGICAL",
      weight_category: "MEGA_CHONKER",
      picture: "https://i.imgur.com/ZC77E1t.jpg",
    },
    {
      id: 3,
      name: "Godzilla",
      mmr: 1000,
      weight: 90000000,
      monster_type: "PREHISTORIC",
      weight_category: "OH_LAWD_HE_COMIN",
      picture: "https://i.imgur.com/ZC77E1t.jpg",
    },
  ];

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
      case "weight_category":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
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
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Edit monster">
                <Link href={"/monster/" + monster?.id}>
                  <IconButton
                    onClick={() => console.log("Edit monster", monster?.id)}
                  >
                    EDIT
                  </IconButton>
                </Link>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };

  return (
    <Card css={{ mw: "450px", m: "$5" }}>
      <Card.Body css={{ py: "$10" }}>
        <Table
          bordered
          shadow={false}
          aria-label="Example table with dynamic content & infinity pagination"
          css={{ minWidth: "50%", height: "50%" }}
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
          <Table.Body items={monsters}>
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
            <Link href={"/monster/create"}>
              <Button>
                <span className={styles.ctaLabel}>Créer un monstre</span>
              </Button>
            </Link>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
}
