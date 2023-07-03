"use client";

import { Card, Col, Row, Spacer, Table, Text } from "@nextui-org/react";
import MyBalance from "./components/MyBalance/MyBalance";
import { useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { Button } from "@components/UI/Button/Button.component";
import { useEffect, useState } from "react";
import AddIbanModal from "./components/AddIbanModal/AddIbanModal";
import DeleteAccountModal from "./components/DeleteAccountModal/DeleteAccountModal";
import { useGetWalletBalanceQuery } from "src/store/wallet/slice";
import { walletState } from "src/store/wallet/selector";
import TransactionHistoryTable from "./components/TransactionHistoryTable/TransactionHistoryTable";
import MenuProfile from "../../../components/MenuProfile";

type WalletPageProps = {};

const WalletPage = (props: WalletPageProps) => {
  const { user } = useSelector(applicationState);
  const wallet = useSelector(walletState);

  const [visibleModalAddIban, setVisibleModalAddIban] = useState(false);
  const [visibleModalDeleteAccount, setVisibleModalDeleteAccount] =
    useState(false);

  const handleModalAddIban = () => {
    setVisibleModalAddIban(!visibleModalAddIban);
  };

  const handleModalDeleteAccount = () => {
    setVisibleModalDeleteAccount(!visibleModalDeleteAccount);
  };

  const {
    data: walletBalance,
    isFetching: walletFetching,
    refetch: refetchWallet,
  } = useGetWalletBalanceQuery();

  useEffect(() => {
    refetchWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  return (
    <div>
      <Row justify="space-between" align="center" css={{ m: "$5" }}>
        <Text h1>Mon portefeuille</Text>
        <Button auto onPress={() => handleModalDeleteAccount()}>
          🗑️ Compte bancaire
        </Button>
      </Row>
      <Row>
        <Col span={4} css={{ m: "$5" }}>
          <MenuProfile />
        </Col>
        <Col span={8} css={{ m: "$5" }}>
          {/* @ts-ignore */}
          {!user?.StripeAccount || !user?.StripeBankAccount ? (
            <Row>
              <Card variant="flat" css={{ h: "15rem", mb: "2rem" }}>
                <Card.Body>
                  <Col>
                    <Row justify="center">
                      <Text h3>🏦 Ajouter votre compte bancaire</Text>
                    </Row>
                    <Row justify="center">
                      <Text h3>
                        {
                          "Veuillez entrer votre IBAN afin d'acheter des credits et que nous puissions vous versez vos gains"
                        }
                      </Text>
                    </Row>
                    <Row justify="center">
                      <AddIbanModal
                        visibleProp={visibleModalAddIban}
                        closeModal={handleModalAddIban}
                      />
                      <Button auto onPress={() => handleModalAddIban()}>
                        Ajouter mon IBAN
                      </Button>
                    </Row>
                  </Col>
                </Card.Body>
              </Card>
            </Row>
          ) : (
            <>
              <Row>
                <MyBalance
                  amount={walletBalance?.credits || 0}
                  fiat={walletBalance?.euro || 0}
                />
              </Row>
              <Row css={{ mt: "$10" }}>
                <TransactionHistoryTable />
              </Row>
            </>
          )}
          <DeleteAccountModal
            visibleProp={visibleModalDeleteAccount}
            closeModal={handleModalDeleteAccount}
          />
        </Col>
      </Row>
    </div>
  );
};

export default WalletPage;
