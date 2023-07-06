"use client";

import { IconButton } from "@components/IconButton";
import { Button } from "@components/UI/Button/Button.component";
import { Col, Row, Spacer, Table, Text, Tooltip } from "@nextui-org/react";
import { Trash } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import {
  useDeleteTournamentMutation,
  useGetAllTournamentsQuery,
} from "src/store/tournament/slice";
import { Tournament } from "src/store/tournament/tournament.model";
import { ModalCreateTournament } from "./components/modalCreateTournament";

export default function ArenaAdmin() {
  const [tournaments, setTournaments] = useState([]);

  const [tournamentDeleteMutation] = useDeleteTournamentMutation();
  const { data, refetch } = useGetAllTournamentsQuery();

  const [visibleModal, setVisibleModal] = useState(false);

  const handleModal = () => {
    setVisibleModal(true);
  };

  const closeModal = () => {
    setVisibleModal(false);
  };

  const onDelete = (id: string) => {
    tournamentDeleteMutation(+id).then(() => {
      refetch();
    });
  };

  useEffect(() => {
    if (data) {
      // @ts-ignore
      setTournaments(data);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  const columns = [
    { name: "NOM", uid: "name" },
    { name: "PARTICIPANTS", uid: "participants" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (tournament: any, columnKey: React.Key) => {
    const cellValue = tournament[columnKey];
    switch (columnKey) {
      case "name":
        return <Text>{tournament?.name}</Text>;
      case "participants":
        const participants =
          tournament?.Participants as Tournament["Participants"];
        return (
          <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
            {participants?.map((participant) => participant?.name).join(", ")}
          </Text>
        );

      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Supprimer">
                <IconButton onClick={() => onDelete(tournament.id)}>
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
      <Text h2>Gestion des Tournois</Text>

      <Spacer y={1.5} />

      <Button onPress={handleModal}>Creer un tournoi</Button>

      <Spacer y={0.5} />

      <Table
        aria-label="Tournament table"
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

        <Table.Body items={tournaments}>
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

      <ModalCreateTournament
        visible={visibleModal}
        closeHandler={closeModal}
        refetch={refetch}
      />
    </>
  );
}
