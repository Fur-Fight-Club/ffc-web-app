"use client";
import { Card, Grid, Text } from "@nextui-org/react";
import { useEffect, useState, useContext } from "react";
import {
  useGetAllTournamentsQuery,
  useStartTournamentMutation,
} from "src/store/tournament/slice";
import { TournamentItem } from "./components/TournamentItem.component";
import { TournamentCard } from "./components/TournamentCard.component";
import { motion } from "framer-motion";
import { SocketContext } from "src/contexts/socket.context";

export default function Tournaments() {
  const { data: tournaments, refetch: refetchTournaments } =
    useGetAllTournamentsQuery();

  const socket = useContext(SocketContext);

  useEffect(() => {
    refetchTournaments();
  }, []);

  const [selectedTournament, setSelectedTournament] = useState<
    number | undefined
  >(undefined);

  useEffect(() => {
    socket.on("match-server-response", (data: any) => {
      refetchTournaments();
    });

    return () => {
      socket.off("match-server-response");
    };
  }, []);

  return (
    <Grid.Container
      css={{
        height: "100%",
      }}
      gap={4}
    >
      {/**
       * Affichage de tous les tournois
       */}
      <Grid
        xs={12}
        md={4}
        css={{
          height: "100%",
        }}
      >
        <motion.div
          initial={{
            x: "-100%",
          }}
          animate={{
            x: 0,
          }}
          style={{
            width: "100%",
            height: "80vh",
          }}
        >
          <Card
            css={{
              height: "100%",
            }}
          >
            <Card.Header>
              <Text h3>Tous les tournois</Text>
            </Card.Header>
            <Card.Body>
              {tournaments?.map((t) => (
                <TournamentItem
                  key={t.id}
                  tournament={t}
                  selected={t.id === selectedTournament}
                  onPress={() => setSelectedTournament(t.id)}
                  onRefresh={() => refetchTournaments()}
                />
              ))}
            </Card.Body>
          </Card>
        </motion.div>
      </Grid>
      <Grid xs={12} md={8}>
        <motion.div
          initial={{
            x: "100%",
          }}
          animate={{
            x: 0,
          }}
          style={{
            width: "100%",
            height: "80vh",
          }}
        >
          <Card
            css={{
              height: "100%",
            }}
          >
            <Card.Header>
              <Text h3>Informations du tournoi</Text>
            </Card.Header>
            <Card.Body>
              {selectedTournament ? (
                <TournamentCard
                  tournament={
                    tournaments?.find((t) => t.id === selectedTournament)!
                  }
                />
              ) : (
                <Text i>
                  Selectionnez un tournoi pour en consulter les informations...
                </Text>
              )}
            </Card.Body>
          </Card>
        </motion.div>
      </Grid>
    </Grid.Container>
  );
}
