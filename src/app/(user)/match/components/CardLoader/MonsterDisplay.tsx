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
import { usePlaceBetMutation } from "src/store/matches/slice";
import { useEffect } from "react";

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
  const [betAmount, setBetAmount] = React.useState(0);
  const [placeBet, { isSuccess: isBettingSuccess }] = usePlaceBetMutation();
  const { isDark } = useTheme();

  const handleBet = () => {
    setModalVisible(false);
    placeBet({
      monster: monster?.id ?? -1,
      amount: betAmount,
      matchId,
    });
  };

  useEffect(() => {
    if (isBettingSuccess) {
      refetch();
    }
  }, [isBettingSuccess]);

  console.log({ winner, monster });

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
          winner === undefined
            ? "none"
            : winner === monster?.id
            ? "0px 0px 15px 0px rgba(0,151,40,0.5)"
            : "0px 0px 20px 0px rgba(255,0,0,0.5)",
      }}
    >
      <Avatar
        src={monster?.picture}
        css={{ width: "10rem", height: "10rem" }}
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
          {monster?.weight}KG
        </Badge>
        <Spacer x={0.5} />
        <Badge size={"lg"} color={"primary"}>
          {monster?.mmr} MMR
        </Badge>
      </div>
      <Spacer y={1} />
      <Badge size={"lg"} color={"warning"}>
        Mise totale :{" "}
        <NumberScroller
          to={totalBets}
          step={
            totalBets >= 100000000
              ? 100000
              : totalBets >= 100000
              ? 1000
              : totalBets >= 10000
              ? 100
              : 10
          }
        />{" "}
        jetons
      </Badge>
      <Spacer y={1} />
      <Button
        analyticsId="bet-on-monster"
        auto
        size={"lg"}
        onPress={() => setModalVisible(true)}
        disabled={matchEnded}
      >
        Parier sur {monster?.name}
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
    </div>
  );
};
