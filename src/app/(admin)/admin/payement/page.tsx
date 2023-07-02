"use client";

import { convertTokenToAmount } from "@utils/utils";
import {
  TransactionTag,
  TransactionType,
} from "ffc-prisma-package/dist/client";
import { useEffect, useState } from "react";
import { useGetAllPayementQuery } from "src/store/payments/slice";

import { Button, Row, Spacer, Table, Text } from "@nextui-org/react";
import { motion } from "framer-motion";

export default function ArenaAdmin() {
  type TransactionSpecial = {
    id: number;
    type: TransactionType;
    tag: TransactionTag;
    amount: number;
    walletId: number;
    invoiceId: number | null;
    matchId: number | null;
    monsterId: number | null;
    Wallet: {
      User: {
        firstname: string;
        lastname: string;
      };
    };
  };

  const [selectedPart, setSelectedPart] = useState<number>(1);
  const { data: allPayementData, refetch } = useGetAllPayementQuery();
  const [payementInData, setPayementInData] = useState<TransactionSpecial[]>(
    []
  );
  const [payementOutData, setPayementOutData] = useState<TransactionSpecial[]>(
    []
  );

  useEffect(() => {
    if (allPayementData) {
      const payementIn = allPayementData.filter(
        (payement: TransactionSpecial) => payement.type === "IN"
      );
      const payementOut = allPayementData.filter(
        (payement: TransactionSpecial) => payement.type === "OUT"
      );

      setPayementInData(payementIn);
      setPayementOutData(payementOut);
    }
  }, [allPayementData]);

  useEffect(() => {
    refetch();
  });

  const handleSelect = (number: number) => {
    setSelectedPart(number);
  };

  const columnsOUT = [
    { name: "ID", uid: "id" },
    { name: "TAG", uid: "tag" },
    { name: "JETONS", uid: "token" },
    { name: "MONTANT", uid: "euro" },
    { name: "Utilisateur", uid: "user" },
  ];

  const columnsIN = [
    { name: "ID", uid: "id" },
    { name: "TAG", uid: "tag" },
    { name: "MONTANT", uid: "amount" },
    { name: "MONTANT", uid: "euro" },
    { name: "Utilisateur", uid: "user" },
  ];

  const renderCellOUT = (
    transaction: TransactionSpecial,
    columnKey: React.Key
  ) => {
    switch (columnKey) {
      case "id":
        return <Text>{transaction?.id}</Text>;
      case "tag":
        return (
          <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
            {transaction?.tag}
          </Text>
        );
      case "token":
        return (
          <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
            {transaction?.amount.toFixed(0)}
          </Text>
        );
      case "euro":
        return (
          <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
            {convertTokenToAmount(transaction?.amount)} €
          </Text>
        );
      case "user":
        return (
          <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
            {transaction?.Wallet?.User?.firstname}{" "}
            {transaction?.Wallet?.User?.lastname}
          </Text>
        );
    }
  };

  const renderCellIN = (
    transaction: TransactionSpecial,
    columnKey: React.Key
  ) => {
    switch (columnKey) {
      case "id":
        return <Text>{transaction?.id}</Text>;
      case "tag":
        return (
          <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
            {transaction?.tag}
          </Text>
        );
      case "token":
        return (
          <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
            {transaction?.amount.toFixed(0)}
          </Text>
        );
      case "euro":
        return (
          <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
            {convertTokenToAmount(transaction?.amount)} €
          </Text>
        );
      case "user":
        return (
          <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
            {transaction?.Wallet?.User?.firstname}{" "}
            {transaction?.Wallet?.User?.lastname}
          </Text>
        );
    }
  };

  return (
    <>
      <Text h2>Gestion des Arènes</Text>

      <Spacer y={1.5} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          ease: "linear",
          duration: 1,
          x: { duration: 0.4 },
        }}
      >
        <Row>
          <Button onPress={() => handleSelect(1)}>Payement entrant</Button>
          <Spacer x={1} />
          <Button onPress={() => handleSelect(2)}>Payement sortant</Button>
        </Row>
      </motion.div>

      <Spacer y={1.5} />

      {selectedPart === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: "linear",
            duration: 1,
            x: { duration: 0.4 },
          }}
        >
          <h3>Tableau payement entrant</h3>

          <Table
            aria-label="Users table"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
            selectionMode="none"
          >
            <Table.Header columns={columnsOUT}>
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

            <Table.Body items={payementInData}>
              {(item: any) => (
                <Table.Row>
                  {(columnKey) => (
                    <Table.Cell>{renderCellIN(item, columnKey)}</Table.Cell>
                  )}
                </Table.Row>
              )}
            </Table.Body>
            <Table.Pagination shadow noMargin align="center" rowsPerPage={10} />
          </Table>
        </motion.div>
      )}

      {selectedPart === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: "linear",
            duration: 1,
            x: { duration: 0.4 },
          }}
        >
          <h3>Tableau payement sortant</h3>

          <Table
            aria-label="Users table"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
            selectionMode="none"
          >
            <Table.Header columns={columnsOUT}>
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

            <Table.Body items={payementOutData}>
              {(item: any) => (
                <Table.Row>
                  {(columnKey) => (
                    <Table.Cell>{renderCellOUT(item, columnKey)}</Table.Cell>
                  )}
                </Table.Row>
              )}
            </Table.Body>
            <Table.Pagination shadow noMargin align="center" rowsPerPage={10} />
          </Table>
        </motion.div>
      )}
    </>
  );
}
