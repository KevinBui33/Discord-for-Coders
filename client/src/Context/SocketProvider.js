import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = React.createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const ENDPOINT = "http://localhost:5000";
    const token = localStorage.getItem("token");
    const newSocket = io(ENDPOINT, { withCredentials: true });

    setSocket(newSocket);
    console.log("created socket connection");

    newSocket.on("connect", () => {
      console.log("client Socket id: " + newSocket.id);
      newSocket.emit("store_client_info");
    });
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
