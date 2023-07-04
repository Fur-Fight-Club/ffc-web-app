"use client";
import { Card, Grid, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useGetAllTournamentsQuery } from "src/store/tournament/slice";
import { TournamentItem } from "./components/TournamentItem.component";

export default function Tournaments() {
  const { data: tournaments, refetch: refetchTournaments } =
    useGetAllTournamentsQuery();

  useEffect(() => {
    refetchTournaments();
  }, []);

  useEffect(() => {
    console.log(tournaments);
  }, [tournaments]);

  const [selectedTournament, setSelectedTournament] = useState<
    number | undefined
  >(undefined);

  return (
    <Grid.Container
      css={{
        height: "100%",
      }}
    >
      {/**
       * Affichage de tous les tournois
       */}
      <Grid
        xs={12}
        md={6}
        css={{
          height: "100%",
        }}
      >
        <Card>
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
              />
            ))}
          </Card.Body>
        </Card>
      </Grid>
      <Grid xs={12} md={6}></Grid>
    </Grid.Container>
  );
}
