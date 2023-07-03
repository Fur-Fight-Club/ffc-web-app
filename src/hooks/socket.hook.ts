import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { env } from "process";

export function useSocketEvents() {
  const [matchServerUpdate, setMatchServerUpdate] = React.useState<number>(0);

  useEffect(() => {
    const socket = io("http://localhost:3999");

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socket.on("match-server-response", (data: { update: boolean }) => {
      setMatchServerUpdate(Date.now());
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { matchServerUpdate };
}
