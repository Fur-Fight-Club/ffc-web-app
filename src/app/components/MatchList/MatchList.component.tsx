"use client";

import * as React from "react";
// @ts-ignore
import { Avatar, Badge, Grid, Spacer, Text } from "@nextui-org/react";
import { textColor, weightCategoryColors } from "@utils/utils";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Match } from "src/store/matches/matches.model";
import styles from "./MatchList.module.scss";

interface MatchListProps {
  match: Match;
  onClickActive?: boolean;
}

export const MatchList: React.FunctionComponent<MatchListProps> = ({
  match,
  onClickActive = true,
}) => {
  const router = useRouter();
  const goToMatch = (matchId: number) => {
    router.push(`/match/${matchId}`);
  };
  return (
    <motion.div
      style={{
        width: "100%",
      }}
      whileHover={onClickActive ? { scale: 1.02 } : undefined}
      whileTap={onClickActive ? { scale: 0.98 } : undefined}
      onClick={onClickActive ? () => goToMatch(match.id) : undefined}
    >
      <Grid xs={12} className={styles.matchItem}>
        <Grid.Container gap={2}>
          <Grid xs={6} justify="center" alignItems="center" direction="column">
            <Avatar src={match.Monster1?.picture} css={{ size: "$20" }} />
            <Text h4>{match.Monster1?.name}</Text>
            <div>
              <Badge
                css={{
                  backgroundColor: weightCategoryColors(
                    match.Monster1?.weight_category
                  ),
                  color: textColor(
                    weightCategoryColors(match.Monster1?.weight_category)
                  ),
                }}
              >
                {match.Monster1?.weight}kg
              </Badge>
              <Badge>
                {match.Monster1?.mmr}
                {match.Monster1?.mmr ? " MMR" : "—"}
              </Badge>
            </div>
          </Grid>
          <Grid
            xs={6}
            justify="center"
            alignItems="center"
            direction="column"
            css={{ cursor: "pointer" }}
          >
            <Avatar
              src={match.Monster2?.picture}
              css={{
                size: "$20",
                cursor: match.Monster2 === undefined ? "pointer" : "default",
              }}
              text="+"
              onClick={match.Monster2 === undefined ? () => {} : undefined}
            />
            <Text h4>{match.Monster2?.name}</Text>
            <div>
              <Badge
                css={{
                  backgroundColor: weightCategoryColors(
                    match.Monster2?.weight_category
                  ),
                  color: textColor(
                    weightCategoryColors(match.Monster2?.weight_category)
                  ),
                }}
              >
                {match.Monster2?.weight}
                {match.Monster2?.weight ? "kg" : "—"}
              </Badge>
              <Badge>
                {match.Monster2?.mmr}
                {match.Monster2?.mmr ? " MMR" : "—"}
              </Badge>
            </div>
          </Grid>
          {match.fk_winner && (
            <Grid
              xs={12}
              justify="center"
              alignItems="center"
              direction="column"
            >
              <Text h4 color="green">
                Match terminé !
              </Text>
              <Text h5>
                {match.fk_winner === match.Monster1?.id
                  ? match.Monster1?.name
                  : match.Monster2?.name}{" "}
                a gagné !
              </Text>
            </Grid>
          )}
        </Grid.Container>
      </Grid>
      <Spacer y={2} />
    </motion.div>
  );
};
