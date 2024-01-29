import { Server as SocketIOServer, Socket } from "socket.io";
import { Server as HTTPServer } from "http";
import { generateRandomString } from "../utils/generateRandomString"; // Assuming this utility function exists
import { ConnectionEvents } from "../constant";
import createToken from "../utils/Token";
export const initSocket = (server: HTTPServer) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
    },
  });

  let codes: any = {};

  io.on("connection", (socket: Socket) => {
    // Generate 6 digit code REQUEST_MANUALCODE
    socket.on(ConnectionEvents.REQUEST_MANUALCODE, () => {
      const token = createToken();
      const code = token.getValue();
      // Store the code and socket id
      codes[code] = {
        id: socket.id,
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
      (conformCode) => {
        if (
          codes[conformCode] &&
          codes[conformCode].isValid >= new Date().getTime()
        ) {
          const socketId = codes[conformCode].id;
          const room = `room-${conformCode}`;
          const currentSocket = io.sockets.sockets.get(socketId);
          currentSocket?.join(room);
          socket.join(room);
          // Emit an event to both sockets confirming the connection
          io.to(room).emit(ConnectionEvents.REQUEST__MANUALCODE_CONFIRMED, {
            confirmed: true,
            room: room,
          });
          delete codes[conformCode];
        } else {
          socket.emit(ConnectionEvents.REQUEST__MANUALCODE_CONFIRMED, {
            confirmed: false,
          });
        }
      }
    );
    socket.on("send_message", (data) => {
      const room = `room-${data.roomId}`;
      io.to(room).emit("receive_message", {
        sender: socket.id,
        message: data.message,
      });
    });
  });
};
