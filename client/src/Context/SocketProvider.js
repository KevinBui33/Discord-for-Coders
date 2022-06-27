import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = React.createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const ENDPOINT = "http://localhost:5000";
    const newSocket = io(ENDPOINT, {
      query: `token=${localStorage.getItem("user")}`,
    });
    setSocket(newSocket);
    console.log("New client socket created");
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
