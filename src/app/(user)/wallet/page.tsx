"use client";

import { Row, Spacer, Table, Text } from "@nextui-org/react";
import colors from "@styles/_colors.module.scss";
import KpiCard from "./components/KpiCard/KpiCard";

type WalletPageProps = {};

const WalletPage = (props: WalletPageProps) => {
  const columns = [
    {
      key: "date",
      label: "DATE",
    },
    {
      key: "amount",
      label: "MONTANT",
    },
    {
      key: "status",
      label: "STATUS",
    },
  ];
  const rows = [
    {
      key: "1",
      name: "Tony Reichert",
      role: "CEO",
      status: "Active",
    },
    {
      key: "2",
      name: "Zoey Lang",
      role: "Technical Lead",
      status: "Paused",
    },
    {
      key: "3",
      name: "Jane Fisher",
      role: "Senior Developer",
      status: "Active",
    },
    {
      key: "4",
      name: "William Howard",
      role: "Community Manager",
      status: "Vacation",
    },
  ];

  return (
    <div>
      <Text h2 size={"$lg"}>
        Données financières
      </Text>
      <Row>
        <KpiCard
          amount={30.9}
          label="Total"
          color={colors.secondaryT500}
          unityLabel="€"
        />
        <Spacer x={1} />
        <KpiCard
          amount={30.9}
          label="Jetons gagnés"
          color={colors.successLight}
          contratsColor={colors.success}
          unityLabel="Jetons"
        />
        <Spacer x={1} />
        <KpiCard
          amount={30.9}
          label="Jetons perdus"
          color={colors.dangerLight}
          contratsColor={colors.danger}
          unityLabel="Jetons"
        />
      </Row>
      <Text h2 size={"$lg"}>
        Historique des transactions
      </Text>
      <Table
        aria-label="Example table with dynamic content"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column key={column.key}>{column.label}</Table.Column>
          )}
        </Table.Header>
        <Table.Body items={rows}>
          {(item) => (
            <Table.Row key={item.key}>
              {(columnKey) => <Table.Cell>pouet</Table.Cell>}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default WalletPage;
