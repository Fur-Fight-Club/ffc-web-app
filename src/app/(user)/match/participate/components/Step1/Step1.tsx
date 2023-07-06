"use client";

import CardList from "@components/CardList/components/CardList";
import { Button, Row, Spacer } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Match } from "src/store/matches/matches.model";
import { useGetMatchesQuery } from "src/store/matches/slice";
import styles from "./Step1.module.scss";

type Step1PropsType = {};

const Step1 = (props: Step1PropsType) => {
  const { data: matches, refetch } = useGetMatchesQuery();

  const selectableMatches =
    matches
      ?.filter((match) => !match.fk_winner && !match.fk_monster_2)
      .sort((a, b) => {
        const dateA: any = new Date(a?.matchStartDate ?? new Date());

        const dateB: any = new Date(b?.matchStartDate ?? new Date());
        return dateB - dateA;
      }) ?? [];

  const [matchesState, setMatchesState] = useState<Match[]>(selectableMatches);

  useEffect(() => {
    refetch();
    setMatchesState(selectableMatches);
  }, []);

  return (
    <div className={styles.step1}>
      <Spacer y={1} />
      <div className={styles.cardList}>
        <CardList>
          {matchesState?.map((match) => (
            <CardList.MatchItem key={match.id} match={match} />
          ))}
        </CardList>
      </div>
      <Spacer y={1} />
      <Row justify="flex-end">
        <Button bordered>Retour</Button>
        <Spacer x={0.5} />
        <Button>Suivant</Button>
      </Row>
    </div>
  );
};

export default Step1;
