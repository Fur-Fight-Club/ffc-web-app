"use client";

import { useEffect, useState } from "react";
import { Monster } from "src/store/monsters/monsters.model";
import {
  useDeleteMonsterMutation,
  useGetAllMonstersQuery,
} from "src/store/monsters/slice";

import { IconButton } from "@components/IconButton";
import { Col, Row, Spacer, Table, Text, Tooltip } from "@nextui-org/react";
import { MagnifyingGlass, Trash } from "@phosphor-icons/react";
import { ModalShowMoreMonster } from "./components/modalShowMoreMonster";

export default function ArenaAdmin() {
  const [monsters, setMonsters] = useState([]);

  const { data, refetch } = useGetAllMonstersQuery();
  const [monsterDeleteMutation] = useDeleteMonsterMutation();

  const [visibleModal, setVisibleModal] = useState(false);

  const handleModal = () => {
    setVisibleModal(true);
  };

  const closeModal = () => {
    setVisibleModal(false);
  };

  const handleDelete = (id: number) => {
    monsterDeleteMutation(id).then(() => {
      refetch();
    });
  };

  useEffect(() => {
    if (data) {
      // @ts-ignore
      setMonsters(data);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  const columns = [
    { name: "NOM", uid: "name" },
    { name: "TYPE", uid: "type" },
    { name: "MMR", uid: "mmr" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (monster: Monster, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return <Text>{monster?.name}</Text>;
      case "type":
        return (
          <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
            {monster?.monster_type}
          </Text>
        );
      case "mmr":
        return (
          <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
            {monster?.mmr}
          </Text>
        );

      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Voir plus">
                <IconButton onClick={() => handleModal()}>
                  <MagnifyingGlass size={20} color="#889096" weight="light" />
                </IconButton>
              </Tooltip>
              <Spacer x={0.5} />
              <Tooltip content="Supprimer">
                <IconButton onClick={() => handleDelete(monster.id)}>
                  <Trash size={20} color="#889096" weight="fill" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };

  return (
    <>
      <Text h2>Gestion des Monstres</Text>

      <Spacer y={0.5} />

      <Table
        aria-label="Monster table"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
        selectionMode="none"
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
          {(item: any) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
        <Table.Pagination shadow noMargin align="center" rowsPerPage={10} />
      </Table>

      <ModalShowMoreMonster visible={visibleModal} closeHandler={closeModal} />
    </>
  );
}
