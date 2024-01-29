import { API_URL } from "config";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
const SOCKET_URL = `${API_URL}`;

export interface ISocket {
  socket?: Socket;
}
export const WebSocketContext = createContext<ISocket>({});

const WebSocketProvider: React.FC<{ children?: ReactNode }> = (props) => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const initializeSocket = () => {
    const newSocket = io(API_URL, { withCredentials: false });
    newSocket.on("connect", () => {
      console.log("connection established", newSocket.connected); // true
    });
    setSocket(newSocket);
    return newSocket;
  };
  useEffect(() => {
    if (!socket) {
      const newSocket = initializeSocket();
      return () => {
        newSocket.disconnect();
      };
    }
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ socket }}>
      {props.children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
