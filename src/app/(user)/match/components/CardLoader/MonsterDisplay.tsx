"use client";

import {
  Avatar,
  Badge,
  Loading,
  Spacer,
  Text,
  Modal,
  Input,
  useTheme,
} from "@nextui-org/react";
import * as React from "react";
import { Monster } from "src/store/monsters/monsters.model";
import {
  convertApiTypeToType,
  textColor,
  weightCategoryColors,
} from "@utils/utils";
import { Button } from "@components/UI/Button/Button.component";
import NumberScroller from "number-scroller";
import { Coins } from "@phosphor-icons/react";
import {
  useJoinMatchMutation,
  usePlaceBetMutation,
} from "src/store/matches/slice";
import { useEffect } from "react";
import { useMotionValue, useTransform, animate, motion } from "framer-motion";
import { SocketContext } from "src/contexts/socket.context";
import { Select } from "antd";
import { applicationState } from "src/store/application/selector";
import { useSelector } from "react-redux";

interface MonsterDisplayProps {
  monster?: Monster;
  totalBets: number;
  refetch: () => void;
  matchId: number;
  matchEnded: boolean;
  winner?: number;
}

export const MonsterDisplay: React.FunctionComponent<MonsterDisplayProps> = ({
  monster,
  totalBets,
  refetch,
  matchId,
  matchEnded,
  winner,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalVisibleMonsters, setModalVisibleMonsters] = React.useState(false);
  const [betAmount, setBetAmount] = React.useState(0);
  const [placeBet, { isSuccess: isBettingSuccess }] = usePlaceBetMutation();
  const { isDark } = useTheme();
  const { user } = useSelector(applicationState);
  const [selectedMonster, setSelectedMonster] = React.useState<number>(-1);
  const [joinMatch, { isSuccess: isSuccessJoin }] = useJoinMatchMutation();

  const socket = React.useContext(SocketContext);

  const handleBet = () => {
    setModalVisible(false);
    placeBet({
      monster: monster?.id ?? -1,
      amount: betAmount,
      matchId,
    });
  };

  useEffect(() => {
    if (isBettingSuccess || isSuccessJoin) {
      refetch();
      socket.emit("match", { update: true });
      setModalVisibleMonsters(false);
      setModalVisible(false);
    }
  }, [isBettingSuccess, isSuccessJoin]);

  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, totalBets, { duration: 3 });

    return animation.stop;
  }, [totalBets]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        // dashed border
        border: isDark ? "2px solid #222" : "2px solid #f3f3f3",
        backgroundColor: isDark ? "#111" : "#fcfcfc",
        borderRadius: "1rem",
        paddingTop: "2rem",
        paddingBottom: "2rem",
        boxShadow:
          winner === null
            ? "none"
            : winner === monster?.id
            ? "0px 0px 15px 0px rgba(0,151,40,0.5)"
            : "0px 0px 20px 0px rgba(255,0,0,0.5)",
      }}
    >
      <Avatar
        src={monster?.picture}
        css={{ width: "10rem", height: "10rem" }}
        text="+"
      />
      <Spacer y={1} />
      <Text h3 transform="uppercase" color="#ba1918" weight={"black"}>
        {monster?.name}
      </Text>
      <Spacer y={-0.5} />
      <Text h6>
        {convertApiTypeToType(monster?.monster_type ?? "A_FINE_BOI")}
      </Text>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Badge
          size={"lg"}
          css={{
            backgroundColor: weightCategoryColors(
              monster?.weight_category ?? "A_FINE_BOI"
            ),
            color: textColor(
              weightCategoryColors(monster?.weight_category ?? "A_FINE_BOI")
            ),
          }}
        >
          {monster?.weight}
          {monster?.weight ? "KG" : "—"}
        </Badge>
        <Spacer x={0.5} />
        <Badge size={"lg"} color={"primary"}>
          {monster?.mmr}
          {monster?.weight ? " MMR" : "—"}
        </Badge>
      </div>
      <Spacer y={1} />
      <Badge size={"lg"} color={"warning"}>
        Mise totale :{" "}
        <motion.div
          style={{
            marginLeft: "0.25rem",
            marginRight: "0.25rem",
          }}
        >
          {rounded}
        </motion.div>{" "}
        jetons
      </Badge>
      <Spacer y={1} />
      <Button
        analyticsId="bet-or-join"
        auto
        size={"lg"}
        onPress={
          monster
            ? () => setModalVisible(true)
            : () => setModalVisibleMonsters(true)
        }
        disabled={matchEnded}
      >
        {monster ? `Parier sur ${monster?.name}` : "Rejoindre le combat"}
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Parier sur{" "}
            <Text b size={18}>
              {monster?.name}
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="11000"
            label="Combien de jetons voulez-vous parier ?"
            type="number"
            onChange={(e) => setBetAmount(+e.target.value)}
            contentLeft={<Coins size={36} />}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            analyticsId="close-bet-modal"
            auto
            flat
            color="error"
            onPress={() => setModalVisible(false)}
          >
            Fermer
          </Button>
          <Button
            analyticsId="handle-bet-modal"
            auto
            onPress={handleBet}
            color={"warning"}
          >
            Parier !
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={modalVisibleMonsters}
        onClose={() => setModalVisibleMonsters(false)}
      >
        <Modal.Header>
          <Text id="modal-title" size={"1.2rem"}>
            Participer au match
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text>Avez qui voulez-vous participer au match ?</Text>
          <Select
            showSearch
            placeholder="Selectionner mon monstre"
            optionFilterProp="children"
            size="large"
            onChange={(e) => setSelectedMonster(+e)}
            dropdownStyle={{ zIndex: 9999 }}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
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
            onPress={() => setModalVisibleMonsters(false)}
          >
            Annuler
          </Button>
          <Button
            auto
            onPress={() => joinMatch({ matchId, monsterId: selectedMonster })}
            disabled={selectedMonster === -1}
          >
            On se lance !
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
