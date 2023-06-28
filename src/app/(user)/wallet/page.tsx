"use client";

import { Card, Col, Row, Spacer, Table, Text } from "@nextui-org/react";
import colors from "@styles/_colors.module.scss";
import KpiCard from "./components/KpiCard/KpiCard";
import MyBalance from "./components/MyBalance/MyBalance";
import { useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { Button } from "@components/UI/Button/Button.component";
import { useRouter } from "next/navigation";

type WalletPageProps = {};

const WalletPage = (props: WalletPageProps) => {
  const { user } = useSelector(applicationState);
  const router = useRouter();

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
      {user?.StripeAccount ? (
        <Row>
          <Card variant="flat" css={{ h: "15rem", mb: "2rem" }}>
            <Card.Body>
              <Col>
                <Row justify="center">
                  <Text h3>🏦 Ajouter votre Iban</Text>
                </Row>
                <Row justify="center">
                  <Text h3>
                    Veuillez entrer votre IBAN afin d'acheter des credits et que
                    nous puissions vous versez vos gains
                  </Text>
                </Row>
                <Row justify="center">
                  <Button auto onPress={() => router.push("profile")}>
                    Ajouter mon IBAN
                  </Button>
                </Row>
              </Col>
            </Card.Body>
          </Card>
        </Row>
      ) : (
        <Row>
          <MyBalance
            amount={"3432"}
            label="Total"
            color={colors.secondaryT500}
            contratsColor={colors.black}
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
            unityLabel="Jetons"
          />
        </Row>
      )}

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
