"use client";

import CardList from "@components/CardList/components/CardList";
import { Button, Row, Spacer } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Match } from "src/store/matches/matches.model";
import { joinMatchFormState } from "src/store/matches/selector";
import {
  setMatchJoinForm,
  setStepJoinForm,
  useGetMatchesQuery,
} from "src/store/matches/slice";
import { Monster } from "src/store/monsters/monsters.model";
import MonsterCardPreview from "../../../organize/components/MonsterCardPreview/MonsterCardPreview";
import styles from "./Step1.module.scss";

type Step1PropsType = {};

const Step1 = (props: Step1PropsType) => {
  const { data: matches, refetch } = useGetMatchesQuery();
  const dispatch = useDispatch();
  const router = useRouter();

  const { match: matchStore } = useSelector(joinMatchFormState);

  const selectableMatches =
    matches
      ?.filter((match) => !match.fk_winner && !match.fk_monster_2)
      .sort((a, b) => {
        const dateA: any = new Date(a?.matchStartDate ?? new Date());

        const dateB: any = new Date(b?.matchStartDate ?? new Date());
        return dateB - dateA;
      }) ?? [];

  const [matchesState, setMatchesState] = useState<Match[]>(selectableMatches);
  const [monsterOpponent, setMonsterOpponent] = useState<Monster | null>(null);

  const handleDisplayOpponent = (monster: Monster) => {
    if (monsterOpponent?.id !== monster.id) {
      setMonsterOpponent(monster);
      return;
    }

    setMonsterOpponent(null);
  };

  const handleMatchClick = (match: Match) => {
    handleDisplayOpponent(match.Monster1);

    matchStore?.id === match.id
      ? dispatch(setMatchJoinForm(null))
      : dispatch(setMatchJoinForm(match));
  };

  const handleNextStep = () => {
    toast.success("Match sélectionné");
    dispatch(setStepJoinForm(1));
  };

  useEffect(() => {
    refetch();
    setMatchesState(selectableMatches);
  }, []);

  return (
    <div className={styles.step1}>
      <Spacer y={1} />
      <div className={styles.content}>
        <div className={styles.cardList}>
          <CardList>
            {matchesState?.map((match) => (
              <CardList.MatchItem
                key={match.id}
                match={match}
                onClick={() => handleMatchClick(match)}
              />
            ))}
          </CardList>
        </div>
        <Spacer x={1} />
        <div className={styles.previews}>
          <MonsterCardPreview
            // @ts-ignore
            monster={monsterOpponent}
            labelPreview="Adversaire"
          />
          <Spacer y={1} />
          <MonsterCardPreview labelPreview="Vous" />
        </div>
      </div>
      <Spacer y={1} />
      <Row justify="flex-end">
        <Button bordered onClick={() => router.back()}>
          Retour
        </Button>
        <Spacer x={0.5} />
        <Button
          {...(!matchStore && { disabled: true })}
          onClick={handleNextStep}
        >
          Suivant
        </Button>
      </Row>
    </div>
  );
};

export default Step1;
