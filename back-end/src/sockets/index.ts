import { Server as SocketIOServer, Socket } from "socket.io";
import { Server as HTTPServer } from "http";
import { ConnectionEvents } from "../constant";

import createToken from "../utils/Token";
type TokenType = {
  clientOneId: string;
  clientTwoId: string;
  isValid: string;
  pairId: string;
};
type ClientDeviceType = {
  code: string;
  room: string;
  deviceId: string;
};

export const initSocket = (server: HTTPServer) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
    },
  });

  let codes: { [key: string]: TokenType } = {};
  let sockets: { [key: string]: ClientDeviceType } = {};

  io.on("connection", (socket: Socket) => {
    console.log({ socket: socket.id });
    // Generate 6 digit code REQUEST_MANUALCODE
    socket.on(ConnectionEvents.REQUEST_MANUALCODE, () => {
      const token = createToken();
      const code = token.getValue();
      // Store the code and socket id
      codes[code] = {
        clientOneId: socket.id,
        clientTwoId: "",
        isValid: token.expires(),
        pairId: token.pairId(),
      };

      socket.emit(ConnectionEvents.UPDATE_MANUALCODE, {
        token: code,
        lifetime: token.getLifetime(),
        isValid: token.expires(),
        pairId: token.pairId(),
      });
    });

    // Request confirmation of the manual code
    socket.on(
      ConnectionEvents.REQUEST_MANUALCODE_CONFIRMATION,
      (conformCode: string) => {
        const isValidTimestamp = Number(codes[conformCode].isValid);
        if (
          codes[conformCode] &&
          !isNaN(isValidTimestamp) &&
          isValidTimestamp >= new Date().getTime()
        ) {
          const socketId = codes[conformCode].clientOneId;
          const room = `room-${conformCode}`;
          const currentSocket = io.sockets.sockets.get(socketId);
          currentSocket?.join(room);
          socket.join(room);
          (socket as any).device = {
            code: conformCode,
            room,
            deviceId: currentSocket.id,
          };
          (currentSocket as any).device = {
            code: conformCode,
            room,
            deviceId: socket.id,
          };
          codes[conformCode].clientTwoId = socket.id;
          // Emit an event to both sockets confirming the connection
          io.to(room).emit(ConnectionEvents.REQUEST__MANUALCODE_CONFIRMED, {
            confirmed: true,
            room: conformCode,
          });
          delete codes[conformCode];
        } else {
          socket.emit(ConnectionEvents.REQUEST__MANUALCODE_CONFIRMED, {
            confirmed: false,
          });
        }
      }
    );
    socket.on(ConnectionEvents.SEND_DATA, (data) => {
      const room = `room-${data.roomId}`;
      io.to(room).emit(ConnectionEvents.RECEIVE_DATA, {
        sender: socket.id,
        message: data.message,
      });
    });
    socket.on("disconnect", () => {
      const client = (socket as any)?.device;
      if (client?.deviceId) {
        const currentSocket = io.sockets.sockets.get(client.deviceId);
        io.to(client?.room).emit(
          ConnectionEvents.UPDATE_OTHERDEVICE_DISCONNECTED,
          {
            isDisconnect: true,
            socketId: socket.id,
          }
        );
        (socket as any).device = null;
        (currentSocket as any).device = null;
      }
    });
  });
};
