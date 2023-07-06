"use client";
import {
  Button,
  Card,
  Grid,
  Spacer,
  Switch,
  Text,
  Loading,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Select } from "antd";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import {
  setEnablePerformance,
  useGetStatCardDataQuery,
  useGetTablesDataQuery,
  useGetChartsDataQuery,
} from "src/store/application/slice";
import { Gauge } from "@phosphor-icons/react";
import { applicationState } from "src/store/application/selector";
import { useDispatch, useSelector } from "react-redux";
import { KpiAdminCard } from "../components/Card/KpiAdminCard";
import { ClickEventTable } from "../components/Table/ClickEventTable.component";
import { LineChart } from "../components/Chart/LineChart.component";
import { DoughnutChart } from "../components/Chart/DoughnutChart.component";
import { AverageTimeSpentTable } from "../components/Table/AverageTimeSpentTable.component";

export default function AdminPage() {
  const {
    analytics: { enablePerformanceWidget },
  } = useSelector(applicationState);
  const disptach = useDispatch();
  // New fetches
  const {
    data: statsCards,
    refetch: refetchStatCards,
    isFetching: isFetchingStatCards,
  } = useGetStatCardDataQuery();
  const {
    data: tablesData,
    refetch: refetchTablesData,
    isFetching: isFetchingTablesData,
  } = useGetTablesDataQuery();
  const {
    data: chartsData,
    refetch: refetchChartsData,
    isFetching: isFetchingChartsData,
  } = useGetChartsDataQuery();

  const [refetchTrigger, setRefetchTrigger] = useState<number>(Date.now());

  const [count, setCount] = useState<number | undefined>(300);
  const [route, setRoute] = useState("/");
  const heatMapImage = (route: string) => {
    switch (route) {
      case "/":
        return "https://i.imgur.com/DV6r8Xy.png";
      case "/tournaments":
        return "https://i.imgur.com/HnxKs1N.png";
      case "/match":
        return "https://i.imgur.com/fsOEQwR.png";

      default:
        return "https://i.imgur.com/DV6r8Xy.png";
    }
  };

  const HeatmapNoSSR = dynamic(
    () =>
      import("../components/ClickHeatmap/ClickHeatmap.component").then(
        (mod) => mod.ClickHeatmap
      ),
    {
      ssr: false,
    }
  );

  const handleRefetch = () => {
    setRefetchTrigger(Date.now());
    refetchStatCards();
    refetchTablesData();
    refetchChartsData();
    toast.loading("Données mises à jour");
  };
  return (
    typeof window !== "undefined" && (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text h2>Analytics</Text>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Switch
              checked={enablePerformanceWidget}
              onChange={() => {
                disptach(setEnablePerformance(!enablePerformanceWidget));
              }}
              size="xl"
              color="success"
              shadow
              bordered
              icon={<Gauge size={36} />}
            />
            <Spacer x={0.5} />
            <Text>
              Widget performance {enablePerformanceWidget ? "ON" : "OFF"}
            </Text>
            <Spacer x={2} />
            <Button auto onPress={handleRefetch}>
              {(isFetchingChartsData ||
                isFetchingStatCards ||
                isFetchingTablesData) && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Loading color="currentColor" size="sm" />
                  <Spacer y={0.5} />
                </div>
              )}
              Rafraîchir les données
            </Button>
          </div>
        </div>
        <Grid.Container gap={2}>
          <Grid xs={12} md={3}>
            <KpiAdminCard
              label="Clics boutons"
              amount={statsCards?.button ?? 0}
            />
          </Grid>
          <Grid xs={12} md={3}>
            <KpiAdminCard
              label="Clics souris"
              amount={statsCards?.mouse ?? 0}
            />
          </Grid>
          <Grid xs={12} md={3}>
            <KpiAdminCard
              label="Changements de routes"
              amount={statsCards?.pathname ?? 0}
            />
          </Grid>
          <Grid xs={12} md={3}>
            <KpiAdminCard
              label="Fermetures d'app"
              amount={statsCards?.closeApp ?? 0}
            />
          </Grid>
          <Grid xs={12} md={3}>
            <KpiAdminCard
              label="Visiteurs uniques"
              amount={statsCards?.uniqueVisitor}
            />
          </Grid>
          <Grid xs={12} md={3}>
            <KpiAdminCard
              label="Debounce rate"
              amount={statsCards?.debounce}
              // @ts-ignore
              unityLabel="%"
            />
          </Grid>
          <Grid xs={12} md={3}>
            <KpiAdminCard
              label="Moyenne pages visitées par session"
              amount={statsCards?.averagePageVisited ?? 0}
            />
          </Grid>
          <Grid xs={12} md={3}>
            <KpiAdminCard
              label="Durée moyenne d'une session"
              amount={statsCards?.averageTimeSpent ?? 0}
            />
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
            <ClickEventTable data={tablesData?.click ?? []} />
          </Grid>
          {/**
           * GRAPHIQUE VISITEURS
           * */}
          <Grid
            xs={12}
            md={6}
            css={{
              height: "50vh",
            }}
          >
            <LineChart
              labels={["J-6", "J-5", "J-4", "J-3", "J-2", "J-1", "J-0"]}
              dataset={{
                label: "Nombre de visites",
                data: (chartsData?.lastVisitors ?? []).map((v) => v.count),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              }}
              loading={isFetchingChartsData}
            >
              Nombre de visite des 7 derniers jours
            </LineChart>
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
            <DoughnutChart
              labels={chartsData?.averages.timeSpent.labels ?? []}
              dataset={{
                label: "Temps passé en moyenne (en ms)",
                data: chartsData?.averages.timeSpent.data ?? [],
              }}
              loading={isFetchingChartsData}
            >
              Temps passé en moyenne sur une page
            </DoughnutChart>
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
            <AverageTimeSpentTable data={tablesData?.averageTime ?? []} />
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
            <DoughnutChart
              labels={chartsData?.proportions.platform.labels ?? []}
              dataset={{
                label: "Nombre de plateformes",
                data: chartsData?.proportions.platform.data ?? [],
              }}
              loading={isFetchingChartsData}
            >
              Proportion des plateformes
            </DoughnutChart>
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
            <DoughnutChart
              labels={chartsData?.proportions.browser.labels ?? []}
              dataset={{
                label: "Nombre de navigateurs",
                data: chartsData?.proportions.browser.data ?? [],
              }}
              loading={isFetchingChartsData}
            >
              Proportion des navigateurs
            </DoughnutChart>
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
            <DoughnutChart
              labels={chartsData?.proportions.lang.labels ?? []}
              dataset={{
                label: "Nombre de langues",
                data: chartsData?.proportions.lang.data ?? [],
              }}
              loading={isFetchingChartsData}
            >
              Proportion des langues
            </DoughnutChart>
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
            <Card
              css={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
                      options={[
                        { value: "/", label: "Page d'accueil" },
                        { value: "/tournaments", label: "Page des tournois" },
                        {
                          value: "/match",
                          label: "Page participer/organiser match",
                        },
                      ]}
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
                <HeatmapNoSSR
                  route={route}
                  count={count}
                  refresh={refetchTrigger}
                  heatmapImage={heatMapImage(route)}
                />
              </Card.Body>
            </Card>
          </Grid>
          {/**
           * GRAPHIQUE PROPORTION DES PAYS
           */}
          <Grid
            xs={12}
            md={6}
            css={{
              height: "42vh",
            }}
          >
            <DoughnutChart
              labels={chartsData?.proportions.country.labels ?? []}
              dataset={{
                label: "Nombre de pays",
                data: chartsData?.proportions.country.data ?? [],
              }}
              loading={isFetchingChartsData}
            >
              Proportion des pays
            </DoughnutChart>
          </Grid>
          {/**
           * GRAPHIQUE PROPORTION DES PROVIDERS
           */}
          <Grid
            xs={12}
            md={6}
            css={{
              height: "42vh",
            }}
          >
            <DoughnutChart
              labels={chartsData?.proportions.provider.labels ?? []}
              dataset={{
                label: "Nombre de pays",
                data: chartsData?.proportions.provider.data ?? [],
              }}
              loading={isFetchingChartsData}
            >
              Proportion des fournisseurs d'accès
            </DoughnutChart>
          </Grid>
        </Grid.Container>
      </div>
    )
  );
}
