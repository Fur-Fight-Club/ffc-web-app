"use client";

import * as React from "react";
// @ts-ignore
import styles from "./PerformanceWidget.module.scss";
import { Button } from "@components/UI/Button/Button.component";
import { Gauge } from "@phosphor-icons/react";
import { useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { motion, AnimatePresence } from "framer-motion";
import { Input, Modal, Spacer, Table, Text } from "@nextui-org/react";
import { useNavigationListener, Navigation } from "@shopify/react-performance";
import { useState } from "react";

interface PerformanceWidgetProps {}

export const PerformanceWidget: React.FunctionComponent<
  PerformanceWidgetProps
> = ({}) => {
  const { analytics, user } = useSelector(applicationState);
  const [show, setShow] = useState<boolean>(false);

  const [lastNavigation, setLastNavigation] = useState<Navigation | null>(null);

  // listen for subsequent client-side navigations and update our state
  useNavigationListener((navigation) => {
    setLastNavigation(navigation);
  });
  return (
    <div>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={show}
        onClose={() => setShow(false)}
        width="50vw"
      >
        <Modal.Header>
          <Text
            h3
            css={{
              textAlign: "left",
              width: "100%",
            }}
          >
            Performance de la page precedente
          </Text>
        </Modal.Header>
        <Modal.Body>
          {lastNavigation === null && (
            <Text>
              Aucune donnée de performance relevée, veuillez naviguer sur le
              site et réesayer... 😔
            </Text>
          )}
          {lastNavigation !== null && (
            <div>
              <Text>
                Route cible : <code>{lastNavigation.target}</code>
              </Text>
              <Spacer y={1} />
              <Text>
                Temps sur la page :{" "}
                <Text b>
                  {(lastNavigation.duration / 1000).toFixed(2)} secondes
                </Text>
              </Text>
              <Spacer y={1} />
              <Text>
                Temps de chargement :{" "}
                <Text b>
                  {(
                    lastNavigation.events.reduce(
                      (acc, event) => acc + event.duration,
                      0
                    ) / 1000
                  ).toFixed(2)}{" "}
                  secondes
                </Text>
              </Text>
              <Table
                aria-label="Unique button events"
                id="unique-button-events"
                striped
                css={{
                  height: "50vh",
                  minWidth: "100%",
                }}
              >
                <Table.Header>
                  <Table.Column allowsResizing>Ordre execution</Table.Column>
                  <Table.Column allowsResizing>Type event</Table.Column>
                  <Table.Column allowsResizing>Duree</Table.Column>
                </Table.Header>
                <Table.Body>
                  {lastNavigation.events.map((event, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>
                        <code>{event.type}</code>
                      </Table.Cell>
                      <Table.Cell>{event.duration.toFixed(2)}ms</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
                <Table.Pagination
                  shadow
                  noMargin
                  align="center"
                  rowsPerPage={5}
                  onPageChange={(page) => null}
                />
              </Table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button auto onPress={() => setShow(false)} color="error">
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
      <AnimatePresence>
        {user.role === "ADMIN" && analytics.enablePerformanceWidget && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              bottom: "2rem",
              right: "2rem",
              zIndex: 9999,
            }}
          >
            <Button
              icon={<Gauge size={36} />}
              auto
              css={{
                width: "5rem",
                height: "5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setShow(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
