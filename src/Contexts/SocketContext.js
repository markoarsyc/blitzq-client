import React, { createContext, useContext } from "react";
import { io } from "socket.io-client";

// Kreiramo kontekst za socket
const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const socket = io("http://localhost:3005");

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
