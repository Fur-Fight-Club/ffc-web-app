"use client";

import { CardListContext } from "@components/CardList/cardlist-context";
import { Avatar, Badge, Grid, Text } from "@nextui-org/react";
import { mergeClassNames } from "@utils/main";
import { textColor, weightCategoryColors } from "@utils/utils";
import { format } from "date-fns";
import fr from "date-fns/locale/fr";
import { motion } from "framer-motion";
import { useContext } from "react";
import { Match } from "src/store/matches/matches.model";
import styles from "./MatchItem.module.scss";

export type MatchItemProps = {
  match: Match;
  onClick?: () => void;
  isSelected?: boolean;
};

const MatchItem = ({ match, onClick, isSelected = false }: MatchItemProps) => {
  const { activeItem, setActiveItem } = useContext(CardListContext);

  const handleOnClick = () => {
    onClick && onClick();
    isMatchSelected ? setActiveItem({} as Match) : setActiveItem(match);
  };

  const isMatchSelected = match.id === activeItem.id || isSelected;

  return (
    <motion.div
      className={mergeClassNames([
        styles.arenaItem,
        isMatchSelected && styles.arenaItemActive,
      ])}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.5 }}
      onClick={handleOnClick}
    >
      <div className={styles.date}>
        {"Le "}
        {format(
          // @ts-ignore
          new Date(match?.matchStartDate ?? new Date()),
          "dd/MM/yyyy à HH:mm",
          {
            locale: fr,
          }
        )}
      </div>
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
    </motion.div>
  );
};

export default MatchItem;
