"use client";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Grid,
  Spacer,
  Table,
  Text,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

import {
  useGetButtonClickEventsQuery,
  useGetLeaveAppEventsQuery,
  useGetMouseClickEventsQuery,
  useGetPathnameChangeEventsQuery,
} from "src/store/application/slice";
import NumberScroller from "number-scroller";
import { numbers } from "src/utils/number.utils";
import { analytics } from "src/utils/analytics.utils";
import { generateRandomColors } from "src/utils/utils";

export default function AnalyticsPage1() {
  const { data: buttonEvents, refetch: refetchButtonsEvents } =
    useGetButtonClickEventsQuery();
  const { data: clickEvents, refetch: refetchClickEvents } =
    useGetMouseClickEventsQuery();
  const { data: pathnameEvents, refetch: refetchPathnameEvents } =
    useGetPathnameChangeEventsQuery();
  const { data: leaveEvents, refetch: refetchLeaveAppEvents } =
    useGetLeaveAppEventsQuery();

  const handleRefetch = () => {
    refetchButtonsEvents();
    refetchClickEvents();
    refetchPathnameEvents();
    refetchLeaveAppEvents();
  };

  const [averageTimeSpentColor, setAverageTimeSpentColor] = useState<
    string[][]
  >(
    generateRandomColors(
      analytics.averageTimeSpentOnEachPage(pathnameEvents ?? []).length
    )
  );

  useEffect(() => {
    handleRefetch();
  }, []);

  useEffect(() => {
    // console.log({ buttonEvents });
    // console.log({ clickEvents });
    // console.log({ pathnameEvents });
    // console.log({ leaveEvents });
    console.log(analytics.averageTimeSpentOnEachPage(pathnameEvents ?? []));
    setAverageTimeSpentColor(
      generateRandomColors(
        analytics.averageTimeSpentOnEachPage(pathnameEvents ?? []).length
      )
    );
  }, [buttonEvents, clickEvents, pathnameEvents, leaveEvents]);
  return (
    <div>
      <Text h2>Analytics</Text>
      <Grid.Container gap={2}>
        <Grid xs={12} md={3}>
          <Card>
            <Card.Body className={styles.cardFlex}>
              <Text h3 className={styles.mainTextNumber}>
                {numbers.suffix(buttonEvents?.length ?? 0)}
              </Text>
              <Text className={styles.subtitleNumber}>Clics boutons</Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} md={3}>
          <Card>
            <Card.Body className={styles.cardFlex}>
              <Text h3 className={styles.mainTextNumber}>
                {numbers.suffix(clickEvents?.length ?? 0)}
              </Text>
              <Text className={styles.subtitleNumber}>Clics souris</Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} md={3}>
          <Card>
            <Card.Body className={styles.cardFlex}>
              <Text h3 className={styles.mainTextNumber}>
                {numbers.suffix(pathnameEvents?.length ?? 0)}
              </Text>
              <Text className={styles.subtitleNumber}>
                Changements de routes
              </Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} md={3}>
          <Card className={styles.cardFlex}>
            <Card.Body>
              <Text h3 className={styles.mainTextNumber}>
                {numbers.suffix(leaveEvents?.length ?? 0)}
              </Text>
              <Text className={styles.subtitleNumber}>Events d'app fermée</Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} md={3}>
          <Card className={styles.cardFlex}>
            <Card.Body>
              <Text h3 className={styles.mainTextNumber}>
                {numbers.suffix(analytics.uniqueVisitor(leaveEvents ?? []))}
              </Text>
              <Text className={styles.subtitleNumber}>Visiteurs uniques</Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} md={3}>
          <Card className={styles.cardFlex}>
            <Card.Body>
              <Text h3 className={styles.mainTextNumber}>
                {numbers.suffix(analytics.debounceRate(leaveEvents ?? []))}%
              </Text>
              <Text className={styles.subtitleNumber}>Debounce rate</Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} md={3}>
          <Card className={styles.cardFlex}>
            <Card.Body>
              <Text h3 className={styles.mainTextNumber}>
                {numbers.suffix(
                  analytics.averagePageVisited(leaveEvents ?? [])
                )}
              </Text>
              <Text className={styles.subtitleNumber}>
                Moyenne pages visitées par session
              </Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} md={3}>
          <Card className={styles.cardFlex}>
            <Card.Body>
              <Text h3 className={styles.mainTextNumber}>
                XX %
              </Text>
              <Text className={styles.subtitleNumber}>placeholder</Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid
          xs={12}
          md={6}
          css={{
            height: "42vh",
          }}
        >
          <Card className={styles.cardFlex}>
            <Card.Body
              css={{
                overflow: "hidden",
              }}
            >
              <Text className={styles.subtitleNumber}>
                Temps passé en moyenne sur une page
              </Text>
              <Spacer y={1} />
              <Doughnut
                style={{
                  position: "relative",
                  top: "-1rem",
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      enabled: true,
                    },
                    decimation: {
                      enabled: false,
                    },
                  },
                }}
                data={{
                  labels: analytics
                    .averageTimeSpentOnEachPage(pathnameEvents ?? [])
                    .map((timeSpent) => timeSpent.page),
                  datasets: [
                    {
                      label: "Temps passé en moyenne (en ms)",
                      data: analytics
                        .averageTimeSpentOnEachPage(pathnameEvents ?? [])
                        .map((timeSpent) => timeSpent.averageTimeSpent),
                      backgroundColor: averageTimeSpentColor.map(
                        (colors) => colors[1]
                      ),

                      borderColor: averageTimeSpentColor.map(
                        (colors) => colors[0]
                      ),
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid
          xs={12}
          md={6}
          css={{
            height: "42vh",
            width: "100%",
          }}
        >
          <Card>
            <Table
              aria-label="Example table with static content"
              striped
              css={{
                height: "auto",
                minWidth: "100%",
              }}
            >
              <Table.Header>
                <Table.Column>Route</Table.Column>
                <Table.Column>Temp passé</Table.Column>
              </Table.Header>
              <Table.Body>
                {analytics
                  .averageTimeSpentOnEachPage(pathnameEvents ?? [])
                  .map((timeSpent) => (
                    <Table.Row>
                      <Table.Cell>
                        <Badge color="primary">{timeSpent.page}</Badge>
                      </Table.Cell>
                      <Table.Cell>{timeSpent.readableTimeSpent}</Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
              <Table.Pagination
                shadow
                noMargin
                align="center"
                rowsPerPage={5}
                onPageChange={(page) => console.log({ page })}
              />
            </Table>
          </Card>
        </Grid>
      </Grid.Container>
    </div>
  );
}
