"use client";
import { Card, Grid, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Match } from "src/store/matches/matches.model";
import { useGetMatchesQuery } from "src/store/matches/slice";
import { MatchList } from "../../components/MatchList/MatchList.component";

type BetPageProps = {};

const BetPage = (props: BetPageProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMatches, setSelectedMatches] = useState<Match[]>([]);

  const { data: matches, refetch } = useGetMatchesQuery();

  useEffect(() => {
    setSelectedMatches(
      matches?.filter(
        (match) =>
          new Date(match.matchStartDate).toLocaleDateString("fr-FR") ===
          selectedDate.toLocaleDateString("fr-FR")
      ) ?? []
    );
  }, [matches, selectedDate]);

  useEffect(() => {
    refetch();
  }, [matches]);

  return (
    <Card>
      <Card.Body>
        <Grid.Container gap={2} justify="center">
          {selectedMatches.map((match, index) => (
            <MatchList match={match} key={index} />
          ))}
          {selectedMatches.length === 0 && (
            <Text h4>Aucun match de prevu pour cette date 😔</Text>
          )}
        </Grid.Container>
      </Card.Body>
    </Card>
  );
};

export default BetPage;
