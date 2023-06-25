"use client";

import { Grid } from "@nextui-org/react";
import UserOverview from "./components/UserOverview/UserOverview";
import styles from "./page.module.scss";

type DashboardProps = {};

const Dashboard = (props: DashboardProps) => {
  return (
    <div className={styles.dashboardContainer}>
      <Grid.Container gap={2} justify="space-between">
        <Grid xs={4}>
          <UserOverview fullname="Adrien Morin" inscriptionDate="" />
        </Grid>
        <Grid xs={4}>pouet</Grid>
        <Grid xs={4}>pouet</Grid>
        <Grid xs={4}>pouet</Grid>
        <Grid xs={4}>pouet</Grid>
        <Grid xs={4}>pouet</Grid>
      </Grid.Container>
    </div>
  );
};

  return (
    <Card css={{ mw: "450px", m: "$5" }}>
      <Card.Body css={{ py: "$10" }}>
        <Table
          bordered
          shadow={false}
          aria-label="Example table with dynamic content & infinity pagination"
          css={{ minWidth: "50%", height: "50%" }}
        >
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column
                key={column.uid}
                hideHeader={column.uid === "actions"}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body items={monsters}>
            {(item) => (
              <Table.Row>
                {(columnKey) => (
                  <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
          <Table.Pagination shadow noMargin align="center" rowsPerPage={3} />
        </Table>
      </Card.Body>
      <Card.Divider />
      <Card.Footer>
        <Row>
          <Col>
            <Link href={"/monster/create"}>
              <Button>
                <span className={styles.ctaLabel}>Créer un monstre</span>
              </Button>
            </Link>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
}
