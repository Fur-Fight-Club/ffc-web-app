"use client";

import { IconButton } from "@components/IconButton";
import { Button } from "@components/UI/Button/Button.component";
import { Col, Row, Table, Text, Tooltip } from "@nextui-org/react";
import { PawPrint, Pencil, Trash } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useGetArenasQuery } from "src/store/arenas/slice";

export default function ArenaAdmin() {
  const [arenas, setArenas] = useState([]);

  // const [visibleModal, setVisibleModal] = useState(false);

  const { data, isSuccess } = useGetArenasQuery();

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      setArenas(data);
    }
  }, [data]);

  const columns = [
    { name: "NOM", uid: "name" },
    { name: "ADRESSE", uid: "address" },
    { name: "VILLE", uid: "city" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (arena: any, columnKey: React.Key) => {
    const cellValue = arena[columnKey];
    switch (columnKey) {
      case "name":
        return <Text>{arena?.name}</Text>;
      case "address":
        return (
          <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
            {arena?.address}
          </Text>
        );
      case "city":
        return (
          <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
            {arena?.city}
          </Text>
        );

      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Voir les monstres">
                <IconButton onClick={() => console.log("hello")}>
                  <PawPrint size={20} color="#889096" weight="fill" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Editer">
                <IconButton onClick={() => console.log("hello")}>
                  <Pencil size={20} color="#889096" weight="fill" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Supprimer"
                color="error"
                onClick={() => console.log("hello")}
              >
                <IconButton>
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
      <div>Arena admin page</div>
      <Button>Ajouter une arène (modal)</Button>

      <Table
        aria-label="Users table"
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

        <Table.Body items={arenas}>
          {(item: any) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </>
  );
}
