"use client";

import { Card, Col, Row, Table, Text, Spacer } from "@nextui-org/react";
import { DownloadSimple } from "@phosphor-icons/react";
import colors from "@styles/_colors.module.scss";
import { format } from "date-fns";
import fr from "date-fns/locale/fr";
import Image from "next/image";
import { useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { convertMoneyToCredits } from "src/utils/utils";
import {
  IconTypeTransaction,
  getImageByAmount,
  tradTagTransaction,
} from "./utils";

type TransactionHistoryTableProps = {};

const TransactionHistoryTable = ({}: TransactionHistoryTableProps) => {
  const { user } = useSelector(applicationState);
  const newTransactions = [...user.transaction];
  newTransactions.sort((a, b) => {
    // @ts-ignore
    const dateA: any = new Date(a?.createdAt);
    // @ts-ignore
    const dateB: any = new Date(b?.createdAt);
    return dateB - dateA;
  });

  const columns = [
    { name: "", uid: "type" },
    { name: "Type de transaction", uid: "tag" },
    { name: "Montant", uid: "amount" },
    { name: "Credits", uid: "credit" },
    { name: "Date", uid: "created_at" },
    { name: "Facture", uid: "Invoice.url" },
  ];

  const formatAmountItemCoinsColumn = (item: any) => {
    if (
      (item.tag === "FEE" && item.type === "IN") ||
      (item.tag === "BET" && item.type === "OUT") ||
      (item.tag === "BET" && item.type === "IN")
    ) {
      return `${item?.amount.toFixed()}`;
    }

    return `${convertMoneyToCredits(item?.amount / 100)}`;
  };

  const formatAmountItemEuroColumn = (item: any) => {
    if (
      (item.tag === "FEE" && item.type === "IN") ||
      (item.tag === "BET" && item.type === "OUT") ||
      (item.tag === "BET" && item.type === "IN")
    ) {
      return `0 €`;
    }

    return `${item?.amount / 100} €`;
  };

  return (
    <Card>
      <Card.Header>
        <Row align="center" css={{ m: "$5" }}>
          <Text size={"$2xl"} weight={"bold"} css={{ letterSpacing: "$wide" }}>
            Historique des transactions
          </Text>
        </Row>
      </Card.Header>
      <Card.Divider />
      <Card.Body>
        {newTransactions.length > 0 ? (
          <Table shadow={false}>
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

            <Table.Body
              items={newTransactions.filter(
                (item) => item?.StripePayments?.status !== "PENDING"
              )}
            >
              {(item) => (
                <Table.Row>
                  <Table.Cell>
                    <Col>
                      <Image
                        src={`/images/${IconTypeTransaction(item?.type)}`}
                        alt={`Image for amount ${item?.type}`}
                        width={20}
                        height={20}
                      />
                    </Col>
                  </Table.Cell>
                  <Table.Cell>
                    <Col>
                      <Row>
                        <Text b size={14} css={{ tt: "capitalize" }}>
                          {tradTagTransaction(item?.tag)}
                        </Text>
                      </Row>
                    </Col>
                  </Table.Cell>
                  <Table.Cell>
                    <Col>
                      <Row>
                        <Text
                          b
                          size={14}
                          css={{ tt: "capitalize", color: "$accents7" }}
                        >
                          {formatAmountItemCoinsColumn(item)}{" "}
                          <Image
                            width={20}
                            height={20}
                            src={`/images/coins/${getImageByAmount(
                              // @ts-ignore
                              item?.amount
                            )}`}
                            /* @ts-ignore */
                            alt={`Image for amount ${item?.amount}`}
                          />
                        </Text>
                      </Row>
                    </Col>
                  </Table.Cell>
                  <Table.Cell>
                    <Col>
                      <Row>
                        <Text
                          b
                          size={14}
                          css={{ tt: "capitalize", color: "$accents7" }}
                        >
                          {formatAmountItemEuroColumn(item)}
                        </Text>
                      </Row>
                    </Col>
                  </Table.Cell>
                  <Table.Cell>
                    <Col>
                      <Col>
                        <Row>
                          {/* @ts-ignore */}
                          {format(
                            // @ts-ignore
                            new Date(item?.createdAt ?? new Date()),
                            "dd/MM/yyyy",
                            {
                              locale: fr,
                            }
                          )}
                        </Row>
                      </Col>
                    </Col>
                  </Table.Cell>
                  <Table.Cell>
                    <Col>
                      <Row>
                        <Col>
                          <Row>
                            <a href={item?.Invoice?.url}>
                              <DownloadSimple color={colors.primary} />
                            </a>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>

            <Table.Pagination noMargin align="center" rowsPerPage={9} />
          </Table>
        ) : (
          <Row align="center" justify="center" css={{ width: "100%" }}>
            <Text weight={"medium"} css={{ mb: "$4" }}>
              Vous n'avez pas encore de transaction faite.
            </Text>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
};

export default TransactionHistoryTable;
