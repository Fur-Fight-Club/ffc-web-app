import React, { useEffect } from "react";
import { Socket, io } from "socket.io-client";
import { env } from "process";

export function useSocketEvents() {
  const socketRef = React.useRef<any>(null);
  const [matchServerUpdate, setMatchServerUpdate] = React.useState<number>(0);

  useEffect(() => {
    const socket = io("http://10.66.125.95:3999");
    socketRef.current = socket;

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

  const emit = (event: string, data: any) => {
    if (socketRef.current) {
      socketRef.current.emit(event, data);
    }
  };

  return { matchServerUpdate, emit };
}
