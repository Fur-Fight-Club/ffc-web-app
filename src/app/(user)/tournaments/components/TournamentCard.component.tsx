"use client";

import * as React from "react";
import {
  BracketMatch,
  Tournament,
} from "src/store/tournament/tournament.model";
import {
  SingleEliminationBracket,
  Match,
  SVGViewer,
} from "@g-loot/react-tournament-brackets";
import { matchsHelpers } from "../utils/matches.utils";
import { useEffect } from "react";
import { useTheme } from "@nextui-org/react";

interface TournamentCardProps {
  tournament: Tournament;
}

export const TournamentCard: React.FunctionComponent<TournamentCardProps> = ({
  tournament: t,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(500);
  const { isDark } = useTheme();

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }
  }, [containerRef.current]);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          border: isDark ? "2px solid #222" : "2px solid #f3f3f3",
          backgroundColor: isDark ? "#111" : "#fcfcfc",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          borderRadius: "1rem",
        }}
        ref={containerRef}
      >
        <SingleEliminationBracket
          matchComponent={Match}
          matches={[
            // Match 7 - Finale
            {
              id: 19753,
              nextMatchId: null,
              participants: [
                {
                  id: t.Matches[6].Monster1?.id ?? matchsHelpers.generateUuid(),
                  isWinner:
                    t.Matches[6].fk_winner === t.Matches[6].Monster1?.id
                      ? true
                      : false,
                  name: t.Matches[6].Monster1?.name ?? "",
                  picture: t.Matches[6].Monster1?.picture ?? "",
                  resultText:
                    t.Matches[6].fk_winner === undefined
                      ? ""
                      : t.Matches[6].fk_winner === t.Matches[6].Monster1?.id
                      ? "Victoire"
                      : "Defaite",
                  status:
                    t.Matches[6].fk_winner === undefined ? null : "PLAYED",
                },
                {
                  id: t.Matches[6].Monster2?.id ?? matchsHelpers.generateUuid(),
                  isWinner:
                    t.Matches[6].fk_winner === t.Matches[6].Monster2?.id
                      ? true
                      : false,
                  name: t.Matches[6].Monster2?.name ?? "",
                  picture: t.Matches[6].Monster2?.picture ?? "",
                  resultText:
                    t.Matches[6].fk_winner === undefined
                      ? ""
                      : t.Matches[6].fk_winner === t.Matches[6].Monster2?.id
                      ? "Victoire"
                      : "Defaite",
                  status:
                    t.Matches[6].fk_winner === undefined ? null : "PLAYED",
                },
              ],
              startTime: t.Matches[6].matchEndDate
                ? new Date(t.Matches[6].matchEndDate).toLocaleString()
                : "Non joué",
              state: t.Matches[6].matchEndDate
                ? "PLAYED"
                : t.Matches[6].matchStartDate
                ? "RUNNING"
                : "NO_SHOW",
              tournamentRoundText: "1",
            },
            // Match 5 - Demi Finale 1
            {
              id: 19754,
              nextMatchId: 19753,
              participants: [
                {
                  id: t.Matches[4].Monster1?.id ?? matchsHelpers.generateUuid(),
                  isWinner:
                    t.Matches[4].fk_winner === t.Matches[4].Monster1?.id
                      ? true
                      : false,
                  name: t.Matches[4].Monster1?.name ?? "",
                  picture: t.Matches[4].Monster1?.picture ?? "",
                  resultText:
                    t.Matches[4].fk_winner === undefined
                      ? ""
                      : t.Matches[4].fk_winner === t.Matches[4].Monster1?.id
                      ? "Victoire"
                      : "Defaite",
                  status:
                    t.Matches[4].fk_winner === undefined ? null : "PLAYED",
                },
                {
                  id: t.Matches[4].Monster2?.id ?? matchsHelpers.generateUuid(),
                  isWinner:
                    t.Matches[4].fk_winner === t.Matches[4].Monster2?.id
                      ? true
                      : false,
                  name: t.Matches[4].Monster2?.name ?? "",
                  picture: t.Matches[4].Monster2?.picture ?? "",
                  resultText:
                    t.Matches[4].fk_winner === undefined
                      ? ""
                      : t.Matches[4].fk_winner === t.Matches[4].Monster2?.id
                      ? "Victoire"
                      : "Defaite",
                  status:
                    t.Matches[4].fk_winner === undefined ? null : "PLAYED",
                },
              ],
              startTime: t.Matches[0].matchEndDate
                ? new Date(t.Matches[0].matchEndDate).toLocaleString()
                : "Non joué",
              state: t.Matches[0].matchEndDate
                ? "PLAYED"
                : t.Matches[0].matchStartDate
                ? "RUNNING"
                : "NO_SHOW",
              tournamentRoundText: "2",
            },
            // Match 1
            {
              id: 19755,
              nextMatchId: 19754,
              participants: [
                {
                  id: t.Matches[0].Monster1?.id ?? matchsHelpers.generateUuid(),
                  isWinner:
                    t.Matches[0].fk_winner === t.Matches[0].Monster1?.id
                      ? true
                      : false,
                  name: t.Matches[0].Monster1?.name ?? "",
                  picture: t.Matches[0].Monster1?.picture ?? "",
                  resultText:
                    t.Matches[0].fk_winner === undefined
                      ? ""
                      : t.Matches[0].fk_winner === t.Matches[0].Monster1?.id
                      ? "Victoire"
                      : "Defaite",
                  status:
                    t.Matches[0].fk_winner === undefined ? null : "PLAYED",
                },
                {
                  id: t.Matches[0].Monster2?.id ?? matchsHelpers.generateUuid(),
                  isWinner:
                    t.Matches[0].fk_winner === t.Matches[0].Monster2?.id
                      ? true
                      : false,
                  name: t.Matches[0].Monster2?.name ?? "",
                  picture: t.Matches[0].Monster2?.picture ?? "",
                  resultText:
                    t.Matches[0].fk_winner === undefined
                      ? ""
                      : t.Matches[0].fk_winner === t.Matches[0].Monster2?.id
                      ? "Victoire"
                      : "Defaite",
                  status:
                    t.Matches[0].fk_winner === undefined ? null : "PLAYED",
                },
              ],
              startTime: t.Matches[0].matchEndDate
                ? new Date(t.Matches[0].matchEndDate).toLocaleString()
                : "Non joué",
              state: t.Matches[0].matchEndDate
                ? "PLAYED"
                : t.Matches[0].matchStartDate
                ? "RUNNING"
                : "NO_SHOW",
              tournamentRoundText: "1",
            },
            // Match 3
            {
              id: 19756,
              nextMatchId: 19754,
              participants: [
                {
                  id: t.Matches[2].Monster1?.id ?? matchsHelpers.generateUuid(),
                  isWinner:
                    t.Matches[2].fk_winner === t.Matches[2].Monster1?.id
                      ? true
                      : false,
                  name: t.Matches[2].Monster1?.name ?? "",
                  picture: t.Matches[2].Monster1?.picture ?? "",
                  resultText:
                    t.Matches[2].fk_winner === undefined
                      ? ""
                      : t.Matches[2].fk_winner === t.Matches[2].Monster1?.id
                      ? "Victoire"
                      : "Defaite",
                  status:
                    t.Matches[2].fk_winner === undefined ? null : "PLAYED",
                },
                {
                  id: t.Matches[2].Monster2?.id ?? matchsHelpers.generateUuid(),
                  isWinner:
                    t.Matches[2].fk_winner === t.Matches[2].Monster2?.id
                      ? true
                      : false,
                  name: t.Matches[2].Monster2?.name ?? "",
                  picture: t.Matches[2].Monster2?.picture ?? "",
                  resultText:
                    t.Matches[2].fk_winner === undefined
                      ? ""
                      : t.Matches[2].fk_winner === t.Matches[2].Monster2?.id
                      ? "Victoire"
                      : "Defaite",
                  status:
                    t.Matches[2].fk_winner === undefined ? null : "PLAYED",
                },
              ],
              startTime: t.Matches[2].matchEndDate
                ? new Date(t.Matches[2].matchEndDate).toLocaleString()
                : "Non joué",
              state: t.Matches[2].matchEndDate
                ? "PLAYED"
                : t.Matches[2].matchStartDate
                ? "RUNNING"
                : "NO_SHOW",
              tournamentRoundText: "1",
            },
            // Match 6 - Demi Finale 2
            {
              id: 19757,
              nextMatchId: 19753,
              participants: [
                {
                  id: t.Matches[5].Monster1?.id ?? matchsHelpers.generateUuid(),
                  isWinner:
                    t.Matches[5].fk_winner === t.Matches[5].Monster1?.id
                      ? true
                      : false,
                  name: t.Matches[5].Monster1?.name ?? "",
                  picture: t.Matches[5].Monster1?.picture ?? "",
                  resultText:
                    t.Matches[5].fk_winner === undefined
                      ? ""
                      : t.Matches[5].fk_winner === t.Matches[5].Monster1?.id
                      ? "Victoire"
                      : "Defaite",
                  status:
                    t.Matches[5].fk_winner === undefined ? null : "PLAYED",
                },
                {
                  id: t.Matches[5].Monster2?.id ?? matchsHelpers.generateUuid(),
                  isWinner:
                    t.Matches[5].fk_winner === t.Matches[5].Monster2?.id
                      ? true
                      : false,
                  name: t.Matches[5].Monster2?.name ?? "",
                  picture: t.Matches[5].Monster2?.picture ?? "",
                  resultText:
                    t.Matches[5].fk_winner === undefined
                      ? ""
                      : t.Matches[5].fk_winner === t.Matches[5].Monster2?.id
                      ? "Victoire"
                      : "Defaite",
                  status:
                    t.Matches[5].fk_winner === undefined ? null : "PLAYED",
                },
              ],
              startTime: t.Matches[5].matchEndDate
                ? new Date(t.Matches[5].matchEndDate).toLocaleString()
                : "Non joué",
              state: t.Matches[5].matchEndDate
                ? "PLAYED"
                : t.Matches[5].matchStartDate
                ? "RUNNING"
                : "NO_SHOW",
              tournamentRoundText: "2",
            },
            // Match 2
            {
              id: 19758,
              nextMatchId: 19757,
              participants: [
                {
                  id: t.Matches[1].Monster1?.id ?? matchsHelpers.generateUuid(),
                  isWinner:
                    t.Matches[1].fk_winner === t.Matches[1].Monster1?.id
                      ? true
                      : false,
                  name: t.Matches[1].Monster1?.name ?? "",
                  picture: t.Matches[1].Monster1?.picture ?? "",
                  resultText:
                    t.Matches[1].fk_winner === undefined
                      ? ""
                      : t.Matches[1].fk_winner === t.Matches[1].Monster1?.id
                      ? "Victoire"
                      : "Defaite",
                  status:
                    t.Matches[1].fk_winner === undefined ? null : "PLAYED",
                },
                {
                  id: t.Matches[1].Monster2?.id ?? matchsHelpers.generateUuid(),
                  isWinner:
                    t.Matches[1].fk_winner === t.Matches[1].Monster2?.id
                      ? true
                      : false,
                  name: t.Matches[1].Monster2?.name ?? "",
                  picture: t.Matches[1].Monster2?.picture ?? "",
                  resultText:
                    t.Matches[1].fk_winner === undefined
                      ? ""
                      : t.Matches[1].fk_winner === t.Matches[1].Monster2?.id
                      ? "Victoire"
                      : "Defaite",
                  status:
                    t.Matches[1].fk_winner === undefined ? null : "PLAYED",
                },
              ],
              startTime: t.Matches[1].matchEndDate
                ? new Date(t.Matches[1].matchEndDate).toLocaleString()
                : "Non joué",
              state: t.Matches[1].matchEndDate
                ? "PLAYED"
                : t.Matches[1].matchStartDate
                ? "RUNNING"
                : "NO_SHOW",
              tournamentRoundText: "1",
            },
            // Match 4
            {
              id: 19759,
              nextMatchId: 19757,
              participants: [
                {
                  id: t.Matches[3].Monster1?.id ?? matchsHelpers.generateUuid(),
                  isWinner:
                    t.Matches[3].fk_winner === t.Matches[3].Monster1?.id
                      ? true
                      : false,
                  name: t.Matches[3].Monster1?.name ?? "",
                  picture: t.Matches[3].Monster1?.picture ?? "",
                  resultText:
                    t.Matches[3].fk_winner === undefined
                      ? ""
                      : t.Matches[3].fk_winner === t.Matches[3].Monster1?.id
                      ? "Victoire"
                      : "Defaite",
                  status:
                    t.Matches[3].fk_winner === undefined ? null : "PLAYED",
                },
                {
                  id: t.Matches[3].Monster2?.id ?? matchsHelpers.generateUuid(),
                  isWinner:
                    t.Matches[3].fk_winner === t.Matches[3].Monster2?.id
                      ? true
                      : false,
                  name: t.Matches[3].Monster2?.name ?? "",
                  picture: t.Matches[3].Monster2?.picture ?? "",
                  resultText:
                    t.Matches[3].fk_winner === undefined
                      ? ""
                      : t.Matches[3].fk_winner === t.Matches[3].Monster2?.id
                      ? "Victoire"
                      : "Defaite",
                  status:
                    t.Matches[3].fk_winner === undefined ? null : "PLAYED",
                },
              ],
              startTime: t.Matches[3].matchEndDate
                ? new Date(t.Matches[3].matchEndDate).toLocaleString()
                : "Non joué",
              state: t.Matches[3].matchEndDate
                ? "PLAYED"
                : t.Matches[3].matchStartDate
                ? "RUNNING"
                : "NO_SHOW",
              tournamentRoundText: "1",
            },
          ]}
          svgWrapper={({ children, ...props }) => (
            <SVGViewer width={width} height={500} {...props}>
              {children}
            </SVGViewer>
          )}
        />
      </div>
    </div>
  );
};
