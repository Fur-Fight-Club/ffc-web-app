"use client";

import { Button } from "@components/UI/Button/Button.component";
import { Avatar, Spacer, Text, Tooltip, useTheme } from "@nextui-org/react";
import { motion } from "framer-motion";
import * as React from "react";
import { Tournament } from "src/store/tournament/tournament.model";

interface TournamentItemProps {
  tournament: Tournament;
  selected: boolean;
  onPress: () => void;
}

export const TournamentItem: React.FunctionComponent<TournamentItemProps> = ({
  tournament: t,
  selected,
  onPress,
}) => {
  const { isDark } = useTheme();
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
              <Avatar src={p.picture} size={"xl"} />
            </Tooltip>
          </motion.div>
        ))}
      </div>
      <Spacer y={1} />
    </motion.div>
  );
};
