"use client";
import { Button, Card, Grid, Text } from "@nextui-org/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
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
      <Card.Header>
        <Grid.Container
          gap={0}
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <Grid xs={4} justify="flex-start">
            <Button
              auto
              icon={<CaretLeft size={32} />}
              onPress={() =>
                setSelectedDate(
                  new Date(selectedDate.setDate(selectedDate.getDate() - 1))
                )
              }
            />
          </Grid>
          <Grid xs={4} justify="center">
            <Text h5>{selectedDate.toLocaleDateString("fr-FR")}</Text>
          </Grid>
          <Grid xs={4} justify="flex-end">
            <Button
              auto
              icon={<CaretRight size={32} />}
              onPress={() =>
                setSelectedDate(
                  new Date(selectedDate.setDate(selectedDate.getDate() + 1))
                )
              }
            />
          </Grid>
        </Grid.Container>
      </Card.Header>
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
