"use client";

import { Button } from "@components/UI/Button/Button.component";
import {
  Card,
  Col,
  Grid,
  Input,
  Loading,
  Modal,
  Button as NUIButton,
  Row,
  Spacer,
  Table,
  Text,
} from "@nextui-org/react";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import {
  useCloseMatchMutation,
  useGetMatchQuery,
  useSendMessageMutation,
} from "src/store/matches/slice";
import { MessageItem } from "../components/CardLoader/MessageItem";
import { useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { toast } from "react-hot-toast";
import { match } from "assert";
import { useSocketEvents } from "src/hooks/socket.hook";
import styles from "./page.module.scss";
import { MonsterDisplay } from "../components/CardLoader/MonsterDisplay";
import { SocketContext } from "src/contexts/socket.context";

export default function MatchPage({ params }: { params: { id: string } }) {
  //const { matchServerUpdate, emit } = useSocketEvents();
  const socket = useContext(SocketContext);
  const { user } = useSelector(applicationState);
  const { data, refetch } = useGetMatchQuery(+params.id ?? -1);

  const [monster1Bets, setMonster1Bets] = useState(0);
  const [monster2Bets, setMonster2Bets] = useState(0);

  useEffect(() => {
    if (data) {
      setMonster1Bets(0);
      setMonster2Bets(0);
      data.Transaction.forEach((transaction) => {
        if (transaction.monsterId === data.Monster1.id) {
          setMonster1Bets((prev) => prev + transaction.amount);
        } else {
          setMonster2Bets((prev) => prev + transaction.amount);
        }
      });
      handleScrollToBottom();
    }
  }, [data]);

  const [message, setMessage] = useState("");
  const messagesRef = useRef(null);
  const [
    sendMessage,
    { isSuccess: isMessageSent, isLoading: isMessageSending },
  ] = useSendMessageMutation();
  useEffect(() => {
    if (isMessageSent) {
      setMessage("");
      refetch();
      socket.emit("match", { update: true });
    }
  }, [isMessageSent]);

  const handleSendMessage = () => {
    if (message.length > 0) {
      sendMessage({
        id: +params.id,
        message,
      });
    } else {
      toast.error("Votre message est vide, veuillez le remplir.");
    }
  };
  const handleScrollToBottom = () => {
    if (messagesRef.current) {
      const { scrollHeight, clientHeight } = messagesRef.current;
      // @ts-ignore
      messagesRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  const [endMatch, { isSuccess: isMatchClosed }] = useCloseMatchMutation();
  const [endMatchModalVisible, setEndMatchModalVisible] = useState(false);

  useEffect(() => {
    refetch();
    socket.emit("match", { update: true });
    handleScrollToBottom();
    setEndMatchModalVisible(false);
  }, [params.id, isMatchClosed]);

  useEffect(() => {
    socket.on("match-server-response", (data: any) => {
      refetch();
    });

    return () => {
      socket.off("match-server-response");
    };
  }, []);

  return (
    <Grid.Container
      gap={5}
      css={{
        height: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {user.role === "ADMIN" && (
        <div
          style={{
            position: "absolute",
            left: "2rem",
            bottom: "2rem",
            zIndex: 100,
          }}
        >
          <NUIButton
            size={"lg"}
            onPress={() => setEndMatchModalVisible(true)}
            disabled={data?.fk_winner ? true : false}
          >
            Terminer le match
          </NUIButton>
          <Modal
            closeButton
            aria-labelledby="modal-title"
            open={endMatchModalVisible}
            onClose={() => setEndMatchModalVisible(false)}
            width="30%"
          >
            <Modal.Body>
              <Text h3>Êtes-vous sûr de vouloir terminer le match ?</Text>
              <Spacer y={1} />
              <Text>
                Cette action est irréversible et entraînera la distribution des
                gains aux gagnants.
              </Text>
            </Modal.Body>
            <Modal.Footer
              css={{
                display: "flex",
                justifyContent: "flex-end",
                flexDirection: "row",
              }}
            >
              <NUIButton
                color="error"
                onClick={() => {
                  setEndMatchModalVisible(false);
                }}
                light
                auto
              >
                Annuler
              </NUIButton>
              <Spacer x={1} />
              <NUIButton
                auto
                color="success"
                onClick={() => {
                  endMatch({
                    matchId: +params.id,
                    winner: data?.Monster1.id ?? -1,
                  });
                }}
              >
                Victoire de {data?.Monster1.name}
              </NUIButton>
              <Spacer x={1} />
              <NUIButton
                color="success"
                auto
                onClick={() => {
                  endMatch({
                    matchId: +params.id,
                    winner: data?.Monster2.id ?? -1,
                  });
                }}
              >
                Victoire de {data?.Monster2.name}
              </NUIButton>
            </Modal.Footer>
          </Modal>
        </div>
      )}
      <Grid
        xs={12}
        md={6}
        css={{
          height: "100%",
        }}
      >
        <motion.div
          className={styles.fullWidthHeight}
          initial={{
            x: "-100%",
          }}
          animate={{
            x: 0,
          }}
        >
          <Card className={styles.fullWidthHeight}>
            <Card.Body className={styles.fullWidthHeight}>
              <div className={styles.leftCard}>
                <div className={styles.innerLeftContainer}>
                  <Grid.Container gap={2} className={styles.fullWidthHeight}>
                    <Grid xs={12} md={6}>
                      <MonsterDisplay
                        monster={data?.Monster1}
                        totalBets={monster1Bets}
                        refetch={refetch}
                        matchId={+params.id ?? -1}
                        matchEnded={data?.matchEndDate ? true : false}
                        winner={data?.fk_winner}
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <MonsterDisplay
                        monster={data?.Monster2}
                        totalBets={monster2Bets}
                        refetch={refetch}
                        matchId={+params.id ?? -1}
                        matchEnded={data?.matchEndDate ? true : false}
                        winner={data?.fk_winner}
                      />
                    </Grid>
                  </Grid.Container>
                </div>
                <div
                  style={{
                    width: "100%",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                  }}
                >
                  <Text h3 color="#ba1918">
                    Historique des paris
                  </Text>
                  <Spacer y={1} />
                  <Table
                    aria-label="bets"
                    striped
                    css={{
                      minWidth: "100%",
                      width: "100%",
                    }}
                  >
                    <Table.Header>
                      <Table.Column>Animal</Table.Column>
                      <Table.Column>Montant</Table.Column>
                      <Table.Column>Parieur</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      {data?.Transaction.map((transaction, index) => (
                        <Table.Row key={index}>
                          <Table.Cell>
                            {transaction.monsterId === data.Monster1.id
                              ? data.Monster1.name
                              : data.Monster2.name}
                          </Table.Cell>
                          <Table.Cell>{transaction.amount} jetons</Table.Cell>
                          <Table.Cell>
                            {transaction.Wallet.User.firstname}{" "}
                            {transaction.Wallet.User.lastname}
                          </Table.Cell>
                        </Table.Row>
                      )) ?? (
                        <Table.Row>
                          <Table.Cell>-</Table.Cell>
                          <Table.Cell>-</Table.Cell>
                          <Table.Cell>-</Table.Cell>
                        </Table.Row>
                      )}
                    </Table.Body>
                    <Table.Pagination
                      shadow
                      noMargin
                      align="center"
                      rowsPerPage={5}
                    />
                  </Table>
                </div>
              </div>
            </Card.Body>
          </Card>
        </motion.div>
      </Grid>

      <Grid
        xs={12}
        md={6}
        css={{
          height: "100%",
        }}
      >
        <motion.div
          className={styles.fullWidthHeight}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          initial={{
            x: "+100%",
          }}
          animate={{
            x: 0,
          }}
        >
          <Card
            css={{
              height: "48%",
            }}
          >
            <Card.Body
              css={{
                p: 0,
              }}
            >
              <Card.Image
                src={data?.Arena.picture ?? ""}
                width="100%"
                height="100%"
                objectFit="cover"
                alt="Card background"
              />
            </Card.Body>
            <Card.Footer
              isBlurred
              css={{
                position: "absolute",
                bgBlur: "#ffffff66",
                borderTop:
                  "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                bottom: 0,
                zIndex: 1,
              }}
            >
              <Row align="center">
                <Col>
                  <Text b color="#ba1918" size={"x-large"}>
                    {data?.Arena.name ?? "-"}
                  </Text>
                  <Text color="#000" size={"$md"}>
                    {`${data?.Arena.address}${
                      data?.Arena.address2 === null
                        ? ""
                        : ` ${data?.Arena.address2}`
                    }, ${data?.Arena.zipcode} ${data?.Arena.city}, ${
                      data?.Arena.country
                    }` ?? "-"}
                  </Text>
                </Col>
                <Col>
                  <Row justify="flex-end">
                    <Button
                      flat
                      auto
                      rounded
                      color="primary"
                      analyticsId="open-arena-in-maps"
                      onPress={() =>
                        (window.location.href = `https://www.google.com/maps/search/?api=1&query=${data?.Arena.address} ${data?.Arena.zipcode} ${data?.Arena.city}`)
                      }
                    >
                      Ouvrir dans Google Maps
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
          <Card
            css={{
              height: "48%",
            }}
          >
            <Card.Body
              css={{
                flexDirection: "column",
              }}
              ref={messagesRef}
            >
              {data?.MatchMessage.map((message) => (
                <MessageItem message={message} key={message.id} />
              ))}
              <Spacer y={2.5} />
            </Card.Body>
            <Card.Footer
              isBlurred
              css={{
                position: "absolute",
                bgBlur: "#ffffff66",
                borderTop:
                  "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                bottom: 0,
                zIndex: 1,
              }}
            >
              <Input
                placeholder="Mon message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                css={{
                  width: "100%",
                }}
                disabled={data?.matchEndDate ? true : false}
                size="xl"
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <Spacer y={1} />
              <Button
                flat
                auto
                rounded
                color="primary"
                analyticsId="send-message-to-match"
                size="lg"
                disabled={data?.matchEndDate ? true : false}
                icon={
                  isMessageSending ? (
                    <Loading color={"white"} />
                  ) : (
                    <PaperPlaneTilt size={"1.5rem"} />
                  )
                }
                onPress={() => handleSendMessage()}
              >
                Envoyer
              </Button>
            </Card.Footer>
          </Card>
        </motion.div>
      </Grid>
    </Grid.Container>
  );
}
