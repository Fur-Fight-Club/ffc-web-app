"use client";

import { Card, Col, Row, Text, Table } from "@nextui-org/react";
import colors from "@styles/_colors.module.scss";
import Image from "next/image";
import {
  getImageByAmount,
  tradTagTransaction,
  IconTypeTransaction,
} from "./utils";
import { useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { Flame } from "@phosphor-icons/react";

type TransactionHistoryTableProps = {};

const TransactionHistoryTable = ({}: TransactionHistoryTableProps) => {
  const { user } = useSelector(applicationState);

  const columns = [
    { name: "", uid: "type" },
    { name: "Type de transaction", uid: "tag" },
    { name: "Montant", uid: "amount" },
    { name: "Match", uid: "matchId" },
    { name: "Monstre", uid: "monsterId" },
  ];

  const renderCell = (transaction: any, columnKey: React.Key) => {
    const cellValue = transaction[columnKey];
    switch (columnKey) {
      case "type":
        return (
          <Col>
            <Image
              src={`/images/${IconTypeTransaction(cellValue)}`}
              alt={`Image for amount ${cellValue}`}
              width={20}
              height={20}
            />
          </Col>
        );
      case "tag":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {tradTagTransaction(cellValue)}
              </Text>
            </Row>
          </Col>
        );
      case "amount":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}{" "}
                <Image
                  src={`/images/coins/${getImageByAmount(cellValue)}`}
                  alt={`Image for amount ${cellValue}`}
                  width={20}
                  height={20}
                />
              </Text>
            </Row>
          </Col>
        );
      case "matchId":
        return (
          (cellValue && (
            <Col>
              <Row>
                <Flame size={20} weight="fill" color={colors.primary} />
              </Row>
            </Col>
          )) || <Col></Col>
        );
      case "monsterId":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
          </Col>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div>
      <Card css={{ minHeight: "50%" }}>
        <Card.Header>
          <Row align="center" css={{ m: "$5" }}>
            <Text
              size={"$2xl"}
              weight={"bold"}
              css={{ letterSpacing: "$wide" }}
            >
              Historique des transactions
            </Text>
          </Row>
        </Card.Header>
        <Card.Divider />
        <Card.Body>
          {user.transaction.length > 0 ? (
            <Table
              shadow={false}
              aria-label="Example table with dynamic content & infinity pagination"
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

              <Table.Body
                items={user.transaction.filter(
                  (item) => item?.StripePayments?.status !== "PENDING"
                )}
              >
                {(item) => (
                  <Table.Row>
                    {(columnKey) => (
                      <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                    )}
                  </Table.Row>
                )}
              </Table.Body>

              <Table.Pagination
                shadow
                noMargin
                align="center"
                rowsPerPage={10}
              />
            </Table>
          ) : (
            <Row justify="center">
              <Text h3 weight={"bold"} css={{ mb: "$4" }}>
                Vous n'avez pas encore de transaction faite.
              </Text>
            </Row>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default TransactionHistoryTable;
