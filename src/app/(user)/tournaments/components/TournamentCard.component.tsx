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
import { useEffect, useContext } from "react";
import {
  Grid,
  Spacer,
  useTheme,
  Text,
  Table,
  Card,
  Button as NUIButton,
} from "@nextui-org/react";
import { Button } from "@components/UI/Button/Button.component";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { useEndRoundMutation } from "src/store/tournament/slice";
import { SocketContext } from "src/contexts/socket.context";

interface TournamentCardProps {
  tournament: Tournament;
}

export const TournamentCard: React.FunctionComponent<TournamentCardProps> = ({
  tournament: t,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(500);
  const { isDark } = useTheme();
  const router = useRouter();
  const { user } = useSelector(applicationState);
  const [endRound, { isSuccess: isSuccessEndRound }] = useEndRoundMutation();

  const socket = useContext(SocketContext);

  useEffect(() => {
    if (isSuccessEndRound) {
      socket.emit("match", { update: true });
    }
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }
  }, [containerRef.current]);

  const [selectedMatchIndex, setSelectedMatchIndex] = React.useState<number>(0);

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
            <SVGViewer
              width={width}
              height={500}
              {...props}
              backgroundColor={isDark ? "#1f1f1f" : "#fff"}
            >
              {children}
            </SVGViewer>
          )}
        />
      </div>
      <Spacer y={2} />
      <div
        style={{
          width: "100%",
          border: isDark ? "2px solid #222" : "2px solid #f3f3f3",
          backgroundColor: isDark ? "#111" : "#fcfcfc",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          borderRadius: "1rem",
        }}
      >
        <Grid.Container gap={4}>
          <Grid xs={2} md={2} justify="center" alignItems="center">
            <Button
              icon={<CaretLeft size={32} />}
              auto
              disabled={selectedMatchIndex <= 0}
              onPress={() => {
                setSelectedMatchIndex(selectedMatchIndex - 1);
              }}
            />
          </Grid>
          <Grid xs={8} md={8} justify="center" alignItems="center">
            <Text h3>
              {t.Matches[selectedMatchIndex].Monster1?.name ?? "A determiner"}{" "}
              vs.{" "}
              {t.Matches[selectedMatchIndex].Monster2?.name ?? "A determiner"}
            </Text>
          </Grid>
          <Grid xs={2} md={2} justify="center" alignItems="center">
            <Button
              icon={<CaretRight size={32} />}
              auto
              disabled={selectedMatchIndex >= 6}
              onPress={() => {
                setSelectedMatchIndex(selectedMatchIndex + 1);
              }}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <Card>
              <Card.Body>
                <Text size={"1.2rem"}>
                  Match <Text b>#{selectedMatchIndex + 1}</Text> du tournoi{" "}
                  <Text b>{t.name}</Text>
                </Text>
                <Spacer y={1} />
                <Text size={"1.2rem"}>
                  Statut du tournoi :{" "}
                  <Text b i>
                    {t.tournamentEndDate
                      ? "Terminé"
                      : t.tournamentStartDate
                      ? "Tournoi en cours"
                      : t.Participants.length !== 8
                      ? "En attente de joueurs..."
                      : "En attente de debut..."}
                  </Text>
                </Text>
                <Text size={"1.2rem"}>
                  Statut du match :{" "}
                  <Text b i>
                    {t.Matches[selectedMatchIndex].matchEndDate
                      ? "Terminé"
                      : t.Matches[selectedMatchIndex].matchStartDate
                      ? "Match en cours"
                      : "Match non commencé"}
                  </Text>
                </Text>
                {t.Matches[selectedMatchIndex].matchEndDate && (
                  <>
                    <Text size={"1.2rem"}>
                      Match disputé le{" "}
                      <Text b>
                        {new Date(
                          t.Matches[selectedMatchIndex].matchEndDate
                        ).toLocaleString()}
                      </Text>
                    </Text>
                    <Text size={"1.2rem"}>
                      Match remporté par{" "}
                      <Text b>
                        {t.Matches[selectedMatchIndex].fk_winner ===
                        t.Matches[selectedMatchIndex].Monster1?.id
                          ? t.Matches[selectedMatchIndex].Monster1?.name
                          : t.Matches[selectedMatchIndex].Monster2?.name}
                      </Text>
                    </Text>
                  </>
                )}
                <Spacer y={1} />
                <Button
                  analyticsId="open-match-from-tournament"
                  onPress={() =>
                    router.push(`/match/${t.Matches[selectedMatchIndex].id}`)
                  }
                  css={{
                    width: "100%",
                  }}
                >
                  Details du match
                </Button>
                {user.role === "ADMIN" && (
                  <>
                    <Spacer y={1} />
                    <NUIButton.Group>
                      <NUIButton
                        css={{
                          width: "50%",
                        }}
                        onPress={() =>
                          endRound({
                            id: t.id,
                            match_id: t.Matches[selectedMatchIndex].id ?? -1,
                            winner_id:
                              t.Matches[selectedMatchIndex].Monster1?.id ?? -1,
                          })
                        }
                      >
                        Victoire {t.Matches[selectedMatchIndex].Monster1?.name}
                      </NUIButton>
                      <NUIButton
                        css={{
                          width: "50%",
                        }}
                        onPress={() =>
                          endRound({
                            id: t.id,
                            match_id: t.Matches[selectedMatchIndex].id ?? -1,
                            winner_id:
                              t.Matches[selectedMatchIndex].Monster2?.id ?? -1,
                          })
                        }
                      >
                        Victoire {t.Matches[selectedMatchIndex].Monster2?.name}
                      </NUIButton>
                    </NUIButton.Group>
                  </>
                )}
              </Card.Body>
            </Card>
          </Grid>
          <Grid
            xs={12}
            md={6}
            css={{
              width: "100%",
            }}
          >
            <div
              style={{
                width: "100%",
              }}
            >
              <Table
                aria-label="bets"
                striped
                css={{
                  minWidth: "100%",
                  width: "100%",
                }}
              >
                <Table.Header>
                  <Table.Column>Animal</Table.Column>
                  <Table.Column>Montant</Table.Column>
                  <Table.Column>Parieur</Table.Column>
                </Table.Header>
                <Table.Body>
                  {t.Matches[selectedMatchIndex]?.Transaction.map(
                    (transaction, index) => (
                      <Table.Row key={index}>
                        <Table.Cell>
                          {transaction.monsterId ===
                          t?.Matches[selectedMatchIndex]?.Monster1?.id
                            ? t?.Matches[selectedMatchIndex]?.Monster1?.name
                            : t?.Matches[selectedMatchIndex]?.Monster2?.name}
                        </Table.Cell>
                        <Table.Cell>{transaction.amount} jetons</Table.Cell>
                        <Table.Cell>
                          {transaction.Wallet.User.firstname}{" "}
                          {transaction.Wallet.User.lastname}
                        </Table.Cell>
                      </Table.Row>
                    )
                  ) ?? (
                    <Table.Row>
                      <Table.Cell>-</Table.Cell>
                      <Table.Cell>-</Table.Cell>
                      <Table.Cell>-</Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
                <Table.Pagination
                  shadow
                  noMargin
                  align="center"
                  rowsPerPage={5}
                />
              </Table>
            </div>
          </Grid>
        </Grid.Container>
      </div>
    </div>
  );
};
