"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import { applicationState } from "src/store/application/selector";
import { useGetMatchesQuery } from "src/store/matches/slice";
import { useGetAllMonsterFromOneUserQuery } from "src/store/monsters/slice";

import { Match } from "src/store/matches/matches.model";
import { Monster } from "src/store/monsters/monsters.model";

import { Text } from "@nextui-org/react";
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

  return (
    <>
      <Text h2>Résumé de tout ces matches</Text>

      {MatchsWhereUserMonsterisInclude(userMonsters, matchesData).length > 0 ? (
        MatchsWhereUserMonsterisInclude(userMonsters, matchesData).map(
          (match: Match) => {
            <MatchList match={match} key={match.id} />;
          }
        )
      ) : (
        <p>Vous n'avez pas de matches</p>
      )}
    </>
  );
}
