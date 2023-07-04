"use client";

import { format } from "date-fns";
import fr from "date-fns/locale/fr";
import { Card, Col, Row, Text, Table } from "@nextui-org/react";
import colors from "@styles/_colors.module.scss";
import Image from "next/image";
import {
  tradTagTransaction,
  IconTypeTransaction,
  getImageByAmount,
} from "./utils";
import { useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { DownloadSimple } from "@phosphor-icons/react";
import { convertMoneyToCredits } from "src/utils/utils";
import { useEffect } from "react";

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
                          {/* @ts-ignore */}
                          {convertMoneyToCredits(item?.amount / 100)}
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
                          {/* @ts-ignore */}
                          {item?.amount / 100} €
                        </Text>
                      </Row>
                    </Col>
                  </Table.Cell>
                  <Table.Cell>
                    <Col>
                      <Col>
                        <Row>
                          {/* @ts-ignore */}
                          {format(new Date(item?.createdAt), "dd/MM/yyyy", {
                            locale: fr,
                          })}
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

            <Table.Pagination shadow noMargin align="center" rowsPerPage={9} />
          </Table>
        ) : (
          <Row justify="center">
            <Text weight={"bold"} css={{ mb: "$4" }}>
              Vous n'avez pas encore de transaction faite.
            </Text>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
};

export default TransactionHistoryTable;
