"use client";

import { Badge, Loading } from "@nextui-org/react";
import * as React from "react";
import { useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { MatchMessage } from "src/store/notifications/notifications.model";

interface MessageItemProps {
  message: MatchMessage;
}

export const MessageItem: React.FunctionComponent<MessageItemProps> = ({
  message,
}) => {
  const { user } = useSelector(applicationState);
  return (
    <div
      style={{
        paddingTop: ".5rem",
        paddingBottom: ".5rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        backgroundColor: user.id === message.User.id ? "#ba1918" : "#f3f3f3",
        color: user.id === message.User.id ? "#fff" : "#000",
        borderRadius: 25,
        alignSelf: user.id === message.User.id ? "flex-end" : "flex-start",
        marginBottom: "2rem",
      }}
    >
      {message.message}
      <p
        style={{
          fontSize: ".8rem",
          color: "#d1d1d1",
          position: "absolute",
          marginTop: ".5rem",
          right: user.id === message.User.id ? "1rem" : "auto",
          left: user.id === message.User.id ? "auto" : "1rem",
        }}
      >
        {message.User.firstname} {message.User.lastname} —{" "}
        {new Date(message.createdAt).toLocaleString()}
      </p>
    </div>
  );
};
