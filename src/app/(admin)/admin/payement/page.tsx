"use client";

import { Button, Row, Spacer, Table, Text } from "@nextui-org/react";
import { convertTokenToAmount } from "@utils/utils";
import {
  TransactionTag,
  TransactionType,
} from "ffc-prisma-package/dist/client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useGetAllPayementQuery } from "src/store/payments/slice";

export default function ArenaAdmin() {
  const [selectedPart, setSelectedPart] = useState<number>(1);
  const [visibleModal, setVisibleModal] = useState(false);

  const { data: allPayementData, refetch } = useGetAllPayementQuery();
  const [payementInData, setPayementInData] = useState<TransactionSpecial[]>(
    []
  );
  const [payementOutData, setPayementOutData] = useState<TransactionSpecial[]>(
    []
  );

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

  useEffect(() => {
    if (allPayementData) {
      const payementIn = allPayementData.filter(
        (payement: Transaction) => payement.type === "IN"
      );
      const payementOut = allPayementData.filter(
        (payement: Transaction) => payement.type === "OUT"
      );
      console.log("payementIn : ", payementIn);
      console.log("payementOut : ", payementOut);

      setPayementInData(payementIn);
      setPayementOutData(payementOut);
    }
  }, [allPayementData]);

  useEffect(() => {
    refetch();
  }, []);

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

        return (
          <Row justify="center" align="center">
            {/* <Col css={{ d: "flex" }}>
              <Tooltip content="Voir les monstres">
                <IconButton onClick={() => console.log("hello")}>
                  <PawPrint size={20} color="#889096" weight="fill" />
                </IconButton>
              </Tooltip>
            </Col> */}
            {/* <Col css={{ d: "flex" }}>
              <Tooltip content="Editer">
                <IconButton onClick={() => console.log("hello")}>
                  <Pencil size={20} color="#889096" weight="fill" />
                </IconButton>
              </Tooltip>
            </Col> */}
            <Col css={{ d: "flex" }}>
              <Tooltip content="Supprimer">
                <IconButton onClick={() => onDelete(arena.id)}>
                  <Trash size={20} color="#889096" weight="fill" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
    }
  };

  return (
    <>
      <Text h2>Gestion des Arènes</Text>

      <Spacer y={1.5} />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Row>
          <Button onPress={() => handleSelect(1)}>Payement entrant</Button>
          <Spacer x={1} />
          <Button onPress={() => handleSelect(2)}>Payement sortant</Button>
        </Row>
      </motion.div>

      <Spacer y={1.5} />

      {selectedPart === 1 && (
        <div>
          <h3>Tableau payement entrant</h3>
        </div>
      )}

      {selectedPart === 2 && (
        <div>
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
        </div>
      )}
    </>
  );
}
