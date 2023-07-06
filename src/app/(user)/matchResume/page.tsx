"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import { applicationState } from "src/store/application/selector";
import { useGetMatchesQuery } from "src/store/matches/slice";
import { useGetAllMonsterFromOneUserQuery } from "src/store/monsters/slice";

import { Match } from "src/store/matches/matches.model";
import { Monster } from "src/store/monsters/monsters.model";

import { Spacer, Text } from "@nextui-org/react";
import { MatchList } from "../../components/MatchList/MatchList.component";

export default function matchResume() {
  const { user } = useSelector(applicationState);

  const { data: matchesData, refetch } = useGetMatchesQuery();
  const { data: userMonsters, refetch: refetchMonsters } =
    useGetAllMonsterFromOneUserQuery(user?.id);

  useEffect(() => {
    refetch();
    refetchMonsters();
  }, []);

  const MatchsWhereUserMonsterisInclude = (
    userMonsters: Monster[] | undefined,
    matchesData: Match[] | undefined
  ) => {
    const idMonsters: number[] = [];
    const matchesInclude: Match[] = [];

    userMonsters?.map((userMonster: Monster) => {
      idMonsters.push(userMonster.id);
    });
    matchesData?.map((match: Match) => {
      if (
        idMonsters.includes(match.fk_monster_1) ||
        idMonsters.includes(match.fk_monster_2)
      ) {
        matchesInclude.push(match);
      }
    });
    return matchesInclude;
  };

  const MatchTest = MatchsWhereUserMonsterisInclude(userMonsters, matchesData);

  return (
    <>
      <Text h2>Résumé de tout ces matches</Text>

      <Spacer y={2} />

      {MatchTest?.length > 0 ? (
        MatchTest?.map((match: Match) => {
          return (
            <MatchList match={match} key={match.id} onClickActive={false} />
          );
        })
      ) : (
        <Text h3>Vous n'avez pas encore de matchs</Text>
      )}
    </>
  );
}
