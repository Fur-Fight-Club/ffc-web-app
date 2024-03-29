import React from "react";
import { io } from "socket.io-client";

export const socket = io("http://35.189.198.119:3999");
export const SocketContext = React.createContext(socket);

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
