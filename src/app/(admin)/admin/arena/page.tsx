"use client";

import { IconButton } from "@components/IconButton";
import { Button } from "@components/UI/Button/Button.component";
import { Col, Row, Spacer, Table, Text, Tooltip } from "@nextui-org/react";
import { ImageSquare, Trash } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Arena } from "src/store/arenas/arenas.model";
import {
  useDeleteArenaMutation,
  useGetArenasQuery,
} from "src/store/arenas/slice";
import { ModalCreateArena } from "./components/modalCreateArena";
import { ModalShowImageArena } from "./components/modalShowPictureArena";

export default function ArenaAdmin() {
  const [arenas, setArenas] = useState([]);
  const [pictureSelected, setPictureSelected] = useState<Arena["picture"]>();

  const [arenaDeleteMutation, { isSuccess }] = useDeleteArenaMutation();
  const { data, refetch } = useGetArenasQuery();

  useEffect(() => {
    console.log(data);
  }, [data]);

  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalPicture, setVisibleModalPicture] = useState(false);

  const handleModal = () => {
    setVisibleModal(true);
  };

  const closeModal = () => {
    setVisibleModal(false);
  };

  const handlePictureSelected = (picture: Arena["picture"]) => {
    setPictureSelected(picture);
  };

  const handleModalPicture = (picture: Arena["picture"]) => {
    setPictureSelected(picture);
    setVisibleModalPicture(true);
  };

  const closeModalPicture = () => {
    setVisibleModalPicture(false);
  };

  const onDelete = (id: string) => {
    arenaDeleteMutation(id).then(() => {
      refetch();
    });
  };

  useEffect(() => {
    if (data) {
      // @ts-ignore
      setArenas(data);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  });

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
              <Tooltip content="Voir l'image">
                <IconButton onClick={() => handleModalPicture(arena.picture)}>
                  <ImageSquare size={20} color="#889096" weight="light" />
                </IconButton>
              </Tooltip>
              <Spacer x={0.3} />
              <Tooltip content="Supprimer">
                <IconButton onClick={() => onDelete(arena.id)}>
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
      <Text h2>Gestion des Arènes</Text>

      <Spacer y={1.5} />

      <Button onPress={handleModal}>Ajouter une arène</Button>

      <Spacer y={0.5} />

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
        <Table.Pagination shadow noMargin align="center" rowsPerPage={10} />
      </Table>

      <ModalCreateArena
        visible={visibleModal}
        closeHandler={closeModal}
        refetch={refetch}
      />
      <ModalShowImageArena
        visible={visibleModalPicture}
        closeHandler={closeModalPicture}
        picture={pictureSelected}
      />
    </>
  );
}
