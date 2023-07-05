"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { useGetMatchesQuery } from "src/store/matches/slice";
import { useGetAllMonsterFromOneUserQuery } from "src/store/monsters/slice";

import { Text } from "@nextui-org/react";
import { MatchList } from "../../components/MatchList/MatchList.component";

export default function matchResume() {
  const { user } = useSelector(applicationState);

  const { data, refetch } = useGetMatchesQuery();
  const { data: userMonsters, refetch: refetchMonsters } =
    useGetAllMonsterFromOneUserQuery(user?.id);

  // pour chaque match, on veut que ceux qui contient l'id d'un des monstres de l'utilisateur

  useEffect(() => {
    refetch();
    refetchMonsters();
  }, []);

  useEffect(() => {
    console.log(data);
    console.log(userMonsters);
  }, [data]);

  return (
    <>
      <Text h2>Résumé de tout ces matches</Text>

      {data?.map((match) => (
        <MatchList match={match} key={match.id} />
      ))}
    </>
  );
}
