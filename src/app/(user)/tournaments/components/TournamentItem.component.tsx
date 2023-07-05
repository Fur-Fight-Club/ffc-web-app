"use client";

import { Button } from "@components/UI/Button/Button.component";
import {
  Avatar,
  Modal,
  Spacer,
  Text,
  Tooltip,
  useTheme,
} from "@nextui-org/react";
import { Select } from "antd";
import { motion } from "framer-motion";
import * as React from "react";
import { useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { SocketContext } from "src/contexts/socket.context";
import { applicationState } from "src/store/application/selector";
import {
  useJoinTournamentMutation,
  useStartTournamentMutation,
} from "src/store/tournament/slice";
import { Tournament } from "src/store/tournament/tournament.model";

interface TournamentItemProps {
  tournament: Tournament;
  selected: boolean;
  onPress: () => void;
  onRefresh: () => void;
}

export const TournamentItem: React.FunctionComponent<TournamentItemProps> = ({
  tournament: t,
  selected,
  onPress,
  onRefresh,
}) => {
  const { isDark } = useTheme();
  const { user } = useSelector(applicationState);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedMonster, setSelectedMonster] = React.useState<number>(-1);
  const [joinTournament, { isSuccess: isSuccessJoin }] =
    useJoinTournamentMutation();

  const [startTournament, { isSuccess: isSuccessStart }] =
    useStartTournamentMutation();

  const socket = useContext(SocketContext);

  useEffect(() => {
    if (isSuccessJoin || isSuccessStart) {
      setModalVisible(false);
      socket.emit("match", { update: true });
      onRefresh();
    }
  }, [isSuccessJoin]);
  return (
    <motion.div
      onClick={onPress}
      style={{
        border: isDark ? "2px solid #222" : "2px solid #f3f3f3",
        backgroundColor: isDark ? "#111" : "#fcfcfc",
        padding: "1.5rem",
        borderRadius: "1rem",
        margin: "1.5rem",
        cursor: "pointer",
        boxShadow: selected ? "0px 0px 15px 0px rgba(0,0,0,0.1)" : "none",
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text h3>{t.name}</Text>
        <Text h6>{t.Participants.length}/8 participants</Text>
      </div>
      <Spacer y={1} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {t.Participants.map((p) => (
          <motion.div key={p.id} whileHover={{ scale: 1.1 }}>
            <Tooltip content={p.name}>
              <Avatar
                src={p.picture}
                size={"lg"}
                css={{
                  border: `2px solid ${isDark ? "#fff" : "#333"}`,
                }}
              />
            </Tooltip>
          </motion.div>
        ))}
      </div>
      <Spacer y={1} />
      {t.tournamentEndDate ? (
        <div>
          <Text h4>Le tournoi est termine !</Text>
          <Spacer y={1} />
          <Text>
            Le gagnant est <Text b>{t.winner?.name}</Text> qui remporte la
            coquette somme de <Text b>{t.entry_cost * 7}</Text> jetons !
          </Text>
          <Spacer y={1} />
        </div>
      ) : t.tournamentStartDate ? (
        <div>
          <Text h4>
            Le tournoi a commence, il est trop tard pour y participer, mais vous
            pouvez suivre son avancement !
          </Text>
          <Spacer y={1} />
        </div>
      ) : t.Participants.length === 8 ? (
        <div>
          <Text h4>Le tournoi est plein, il va bientot commencer !</Text>
          <Spacer y={1} />
          {user.role === "ADMIN" && (
            <>
              <Button
                css={{
                  width: "100%",
                }}
                onPress={() => startTournament(t.id)}
              >
                Demarrer le tournoi
              </Button>
              <Spacer y={1} />
            </>
          )}
        </div>
      ) : (
        <div>
          <Text h4>
            Le tournoi n'a pas encore commence, il est encore temps d'y
            participer !
          </Text>
          <Spacer y={1} />
          <Text>
            La mise a gagner est de <Text b>{t.entry_cost * 7}</Text> jetons !
          </Text>
          <Spacer y={1} />
          <Button
            css={{
              width: "100%",
            }}
            onPress={() => setModalVisible(true)}
          >
            Faire participer mon monstre
          </Button>
          <Spacer y={1} />
          <Modal
            closeButton
            aria-labelledby="modal-title"
            open={modalVisible}
            onClose={() => setModalVisible(false)}
          >
            <Modal.Header>
              <Text id="modal-title" size={"1.2rem"}>
                Participer au tournoi <Text b>{t.name}</Text>
              </Text>
            </Modal.Header>
            <Modal.Body>
              <Text>Avez qui voulez-vous participer au tournoi ?</Text>
              <Select
                showSearch
                placeholder="Selectionner mon monstre"
                optionFilterProp="children"
                size="large"
                onChange={(e) => setSelectedMonster(+e)}
                dropdownStyle={{ zIndex: 9999 }}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={user?.Monster.map((m) => ({
                  value: m.id,
                  label: `${m.name} (${m.mmr} MMR)`,
                }))}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                auto
                flat
                color="error"
                onPress={() => setModalVisible(false)}
              >
                Annuler
              </Button>
              <Button
                auto
                onPress={() =>
                  joinTournament({ id: t.id, monster_id: selectedMonster })
                }
                disabled={selectedMonster === -1}
              >
                On se lance !
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </motion.div>
  );
};
