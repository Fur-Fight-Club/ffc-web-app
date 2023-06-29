"use client";

import * as React from "react";
// @ts-ignore
import styles from "./MatchList.module.scss";
import { Match } from "src/store/matches/matches.model";
import { motion } from "framer-motion";
import { Grid, Badge, Text, Avatar, Spacer } from "@nextui-org/react";
import { textColor, weightCategoryColors } from "@utils/utils";
import { useRouter } from "next/navigation";

interface MatchListProps {
  match: Match;
}

export const MatchList: React.FunctionComponent<MatchListProps> = ({
  match,
}) => {
  const router = useRouter();
  return (
    <motion.div
      style={{
        width: "100%",
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => router.push(`/match/${match.id}`)}
    >
      <Grid xs={12} className={styles.matchItem}>
        <Grid.Container gap={2}>
          <Grid xs={6} justify="center" alignItems="center" direction="column">
            <Avatar src={match.Monster1.picture} css={{ size: "$20" }} />
            <Text h4>{match.Monster1.name}</Text>
            <div>
              <Badge
                css={{
                  backgroundColor: weightCategoryColors(
                    match.Monster1.weight_category
                  ),
                  color: textColor(
                    weightCategoryColors(match.Monster1.weight_category)
                  ),
                }}
              >
                {match.Monster1.weight}kg
              </Badge>
              <Badge>{match.Monster1.mmr} MMR</Badge>
            </div>
          </Grid>
          <Grid xs={6} justify="center" alignItems="center" direction="column">
            <Avatar src={match.Monster2.picture} css={{ size: "$20" }} />
            <Text h4>{match.Monster2.name}</Text>
            <div>
              <Badge
                css={{
                  backgroundColor: weightCategoryColors(
                    match.Monster2.weight_category
                  ),
                  color: textColor(
                    weightCategoryColors(match.Monster2.weight_category)
                  ),
                }}
              >
                {match.Monster2.weight}kg
              </Badge>
              <Badge>{match.Monster2.mmr} MMR</Badge>
            </div>
          </Grid>
        </Grid.Container>
      </Grid>
      <Spacer y={2} />
    </motion.div>
  );
};
