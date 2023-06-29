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

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import {
  useGetButtonClickEventsQuery,
  useGetLeaveAppEventsQuery,
  useGetMouseClickEventsQuery,
  useGetPathnameChangeEventsQuery,
} from "src/store/application/slice";
import { numbers } from "src/utils/number.utils";
import { generateRandomColors } from "src/utils/utils";
import { toast } from "react-hot-toast";
import { analytics } from "src/utils/analytics.utils";
import { ClickHeatmap } from "../components/ClickHeatmap/ClickHeatmap.component";
import { Select } from "antd";

export default function AnalyticsPage1() {
  const { data: buttonEvents, refetch: refetchButtonsEvents } =
    useGetButtonClickEventsQuery();
  const { data: clickEvents, refetch: refetchClickEvents } =
    useGetMouseClickEventsQuery();
  const { data: pathnameEvents, refetch: refetchPathnameEvents } =
    useGetPathnameChangeEventsQuery();
  const { data: leaveEvents, refetch: refetchLeaveAppEvents } =
    useGetLeaveAppEventsQuery();

  const [refetchTrigger, setRefetchTrigger] = useState<number>(Date.now());

  const handleRefetch = () => {
    refetchButtonsEvents();
    refetchClickEvents();
    refetchPathnameEvents();
    refetchLeaveAppEvents();
    setRefetchTrigger(Date.now());
    toast.loading("Données mises à jour");
  };

  const [userAgents, setUserAgents] = useState<any[]>(
    analytics.aggregateUserAgents(
      leaveEvents ?? [],
      pathnameEvents ?? [],
      clickEvents ?? []
    )
  );

  const [averageTimeSpentColor, setAverageTimeSpentColor] = useState<
    string[][]
  >(
    generateRandomColors(
      analytics.averageTimeSpentOnEachPage(pathnameEvents ?? []).length
    )
  );

  const [browserProportionColor, setBrowserProportionColor] = useState<
    string[][]
  >(generateRandomColors(analytics.proportion.browser(userAgents).length));

  const [platformProportionColor, setPlatformProportionColor] = useState<
    string[][]
  >(generateRandomColors(analytics.proportion.platform(userAgents).length));

  const [languageProportionColor, setLanguageProportionColor] = useState<
    string[][]
  >(generateRandomColors(analytics.proportion.language(userAgents).length));

  useEffect(() => {
    handleRefetch();
    // Refetch every 30 seconds
    const interval = setInterval(() => {
      handleRefetch();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setAverageTimeSpentColor(
      generateRandomColors(
        analytics.averageTimeSpentOnEachPage(pathnameEvents ?? []).length
      )
    );
    setBrowserProportionColor(
      generateRandomColors(analytics.proportion.browser(userAgents).length)
    );
    setPlatformProportionColor(
      generateRandomColors(analytics.proportion.platform(userAgents).length)
    );
    setLanguageProportionColor(
      generateRandomColors(analytics.proportion.language(userAgents).length)
    );

    setUserAgents(
      analytics.aggregateUserAgents(
        leaveEvents ?? [],
        pathnameEvents ?? [],
        clickEvents ?? []
      )
    );
  }, [buttonEvents, clickEvents, pathnameEvents, leaveEvents]);

  const [count, setCount] = useState<number | undefined>(300);
  const [route, setRoute] = useState("/");
  const heatMapImage = (route: string) => {
    switch (route) {
      case "/":
        return "https://i.imgur.com/xd0cGER.png";

      default:
        return "https://i.imgur.com/xd0cGER.png";
    }
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text h2>Analytics</Text>
        <Button auto onPress={handleRefetch}>
          Rafraîchir les données
        </Button>
      </div>
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
                {analytics.averageSessionTime(leaveEvents ?? [])}
              </Text>
              <Text className={styles.subtitleNumber}>
                Durée moyenne d'une session
              </Text>
            </Card.Body>
          </Card>
        </Grid>
        {/**
         * TABLE EVENEMENT UNIQUES CLIC BOUTONS
         */}
        <Grid
          xs={12}
          md={6}
          css={{
            height: "50vh",
            width: "100%",
          }}
        >
          <Card>
            <Table
              aria-label="Unique button events"
              id="unique-button-events"
              striped
              css={{
                height: "50vh",
                minWidth: "100%",
              }}
            >
              <Table.Header>
                <Table.Column allowsResizing>ID évènement</Table.Column>
                <Table.Column allowsResizing>Prévisualisation</Table.Column>
                <Table.Column allowsSorting allowsResizing>
                  # de clics
                </Table.Column>
              </Table.Header>
              <Table.Body>
                {analytics
                  .uniqueButtonClicked(buttonEvents ?? [])
                  .map((ubc, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>
                        <Badge color="primary">{ubc.event}</Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <Button auto disabled>
                          {ubc.content}
                        </Button>
                      </Table.Cell>
                      <Table.Cell>{ubc.count}</Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
              <Table.Pagination
                shadow
                noMargin
                align="center"
                rowsPerPage={5}
                onPageChange={(page) => null}
              />
            </Table>
          </Card>
        </Grid>
        <Grid
          xs={12}
          md={6}
          css={{
            height: "50vh",
          }}
        >
          <Card className={styles.cardFlex}>
            <Card.Body
              css={{
                overflow: "hidden",
              }}
            >
              <Line
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top" as const,
                    },
                    title: {
                      display: true,
                      text: "Nombre de visite des 7 derniers jours",
                    },
                  },
                }}
                data={{
                  labels: ["J-6", "J-5", "J-4", "J-3", "J-2", "J-1", "J-0"],
                  datasets: [
                    {
                      label: "Nombre de visites",
                      data: analytics
                        .getLastVisitors(leaveEvents ?? [])
                        .map((v) => v.count),
                      borderColor: "rgb(255, 99, 132)",
                      backgroundColor: "rgba(255, 99, 132, 0.5)",
                    },
                  ],
                }}
              />
            </Card.Body>
          </Card>
        </Grid>
        {/**
         * GRAPHIQUE TEMPS MOYEN PAR PAGE
         */}
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
              <Doughnut
                style={{
                  position: "relative",
                  top: "-1rem",
                }}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Temps passé en moyenne sur une page",
                    },
                    legend: {
                      display: true,
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
                    .averageTimeSpentOnEachPage(
                      analytics.filter.pathname(pathnameEvents ?? [])
                    )
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
        {/**
         * TABLE TEMPS MOYEN PAR PAGE
         */}
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
                  .averageTimeSpentOnEachPage(
                    analytics.filter.pathname(pathnameEvents ?? [])
                  )
                  .map((timeSpent, index) => (
                    <Table.Row key={index}>
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
                onPageChange={(page) => null}
              />
            </Table>
          </Card>
        </Grid>
        {/**
         * GRAPHIQUE PROPORTION DES PLATEFORMES
         */}
        <Grid
          xs={12}
          md={4}
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
              <Doughnut
                style={{
                  position: "relative",
                  top: "-1rem",
                }}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Proportion des plateformes",
                    },
                    legend: {
                      display: true,
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
                  labels: analytics.proportion
                    .platform(userAgents ?? [])
                    .map(
                      (p) =>
                        `${p.platform} (${(p.proportion * 100).toFixed(0)}%)`
                    ),
                  datasets: [
                    {
                      label: "Nombre de plateformes",
                      data: analytics.proportion
                        .platform(userAgents ?? [])
                        .map((p) => p.count),
                      backgroundColor: platformProportionColor.map(
                        (colors) => colors[1]
                      ),

                      borderColor: platformProportionColor.map(
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
        {/**
         * GRAPHIQUE PROPORTION DES NAVIGATEURS
         */}
        <Grid
          xs={12}
          md={4}
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
              <Doughnut
                style={{
                  position: "relative",
                  top: "-1rem",
                }}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Proportion des navigateurs",
                    },
                    legend: {
                      display: true,
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
                  labels: analytics.proportion
                    .browser(userAgents ?? [])
                    .map(
                      (browser) =>
                        ` ${browser.browser} (${(
                          browser.proportion * 100
                        ).toFixed(0)}%)`
                    ),
                  datasets: [
                    {
                      label: "Nombre de navigateurs",
                      data: analytics.proportion
                        .browser(userAgents ?? [])
                        .map((browser) => browser.count),
                      backgroundColor: browserProportionColor.map(
                        (colors) => colors[1]
                      ),

                      borderColor: browserProportionColor.map(
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
        {/**
         * GRAPHIQUE PROPORTION DES LANGUES
         */}
        <Grid
          xs={12}
          md={4}
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
              <Doughnut
                style={{
                  position: "relative",
                  top: "-1rem",
                }}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Proportion des langues",
                    },
                    legend: {
                      display: true,
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
                  labels: analytics.proportion
                    .language(userAgents ?? [])
                    .map(
                      (lang) =>
                        `${lang.language} (${(lang.proportion * 100).toFixed(
                          0
                        )}%)`
                    ),
                  datasets: [
                    {
                      label: "Nombre de langues",
                      data: analytics.proportion
                        .language(userAgents ?? [])
                        .map((lang) => lang.count),
                      backgroundColor: languageProportionColor.map(
                        (colors) => colors[1]
                      ),

                      borderColor: languageProportionColor.map(
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

        {/**
         * HEATMAP CLICS
         */}
        <Grid
          xs={12}
          md={6}
          css={{
            height: "50vh",
          }}
        >
          <Card className={styles.cardFlex}>
            <Card.Body
              css={{
                overflow: "hidden",
              }}
            >
              <Grid.Container gap={2}>
                <Grid xs={12}>
                  <Text h4>Heatmap des clics</Text>
                </Grid>
                <Grid xs={12} md={6}>
                  <Select
                    defaultValue="/"
                    style={{ width: "100%" }}
                    onChange={(value) => setRoute(value)}
                    options={[{ value: "/", label: "Page d'accueil" }]}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <Select
                    defaultValue="300"
                    style={{ width: "100%" }}
                    onChange={(value) =>
                      value === "all" ? setCount(undefined) : setCount(+value)
                    }
                    options={[
                      { value: "50", label: "50 entrées" },
                      { value: "100", label: "100 entrées" },
                      { value: "300", label: "300 entrées" },
                      { value: "500", label: "500 entrées" },
                      { value: "all", label: "Tout afficher" },
                    ]}
                  />
                </Grid>
              </Grid.Container>
              <ClickHeatmap
                route={route}
                count={count}
                refresh={refetchTrigger}
                heatmapImage={heatMapImage(route)}
              />
            </Card.Body>
          </Card>
        </Grid>
        {/**
         * HEATMAP PAYS
         */}
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
            ></Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </div>
  );
}
