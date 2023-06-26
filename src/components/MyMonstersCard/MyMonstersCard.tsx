"use client";
import {
  Card,
  Col,
  Link,
  Row,
  Table,
  Text,
  Tooltip,
  User,
} from "@nextui-org/react";
import styles from "./MyMonstersCard.module.scss";
import { IconButton } from "@components/IconButton";
import { convertApiTypeToLogo } from "./utils";
import { useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { useEffect } from "react";
import {
  useDeleteMonsterMutation,
  useGetMonstersQuery,
} from "src/store/monsters/slice";
import { Button } from "@components/UI/Button/Button.component";

export default function MyMonstersCard() {
  const { user } = useSelector(applicationState);

  const [deleteMonster] = useDeleteMonsterMutation();

  const columns = [
    { name: "Nom de(s) montre(s)", uid: "name" },
    { name: "MMR", uid: "mmr" },
    // { name: "CATERORIE", uid: "weight_category" },
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
          <Col css={{ d: "flex" }}>
            <Tooltip content="Edit monster">
              <Link href={"/monster/" + monster?.id}>
                <IconButton
                  onClick={() => console.log("Edit monster", monster?.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#b91919"
                    viewBox="0 0 256 256"
                  >
                    <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31l83.67-83.66,3.48,13.9-36.8,36.79a8,8,0,0,0,11.31,11.32l40-40a8,8,0,0,0,2.11-7.6l-6.9-27.61L227.32,96A16,16,0,0,0,227.32,73.37ZM48,179.31,76.69,208H48Zm48,25.38L51.31,160,136,75.31,180.69,120Zm96-96L147.32,64l24-24L216,84.69Z"></path>
                  </svg>
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip content="delete monster">
              <IconButton onClick={() => handleDeleteMonster(monster?.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#b91919"
                  viewBox="0 0 256 256"
                >
                  <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
                </svg>
              </IconButton>
            </Tooltip>
          </Col>
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
