const SocketIOServer = require("socket.io").Server
const HTTPServer = require("http").Server
const ConnectionEvents = require("../constant").ConnectionEvents
const createToken = require("../utils/Token")

const initSocket = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
    },
  })

  let codes = {}
  let sockets = {}

  io.on("connection", (socket) => {
    console.log({ socket: socket.id })
    socket.on(ConnectionEvents.REQUEST_MANUALCODE, () => {
      let token = createToken.createToken()
      let code = token.getValue()
      codes[code] = {
        clientOneId: socket.id,
        clientTwoId: "",
        isValid: token.expires(),
        pairId: token.pairId(),
      }

      socket.emit(ConnectionEvents.UPDATE_MANUALCODE, {
        token: code,
        lifetime: token.getLifetime(),
        isValid: token.expires(),
        pairId: token.pairId(),
      })
    })

    socket.on(
      ConnectionEvents.REQUEST_MANUALCODE_CONFIRMATION,
      (conformCode) => {
        let isValidTimestamp = Number(codes[conformCode].isValid)
        if (
          codes[conformCode] &&
          !isNaN(isValidTimestamp) &&
          isValidTimestamp >= new Date().getTime()
        ) {
          let socketId = codes[conformCode].clientOneId
          let room = "room-" + conformCode
          let currentSocket = io.sockets.sockets.get(socketId)
          currentSocket && currentSocket.join(room)
          socket.join(room)
          socket.device = {
            code: conformCode,
            room: room,
            deviceId: currentSocket ? currentSocket.id : undefined,
          }
          if (currentSocket) {
            currentSocket.device = {
              code: conformCode,
              room: room,
              deviceId: socket.id,
            }
          }
          codes[conformCode].clientTwoId = socket.id

          io.to(room).emit(ConnectionEvents.REQUEST__MANUALCODE_CONFIRMED, {
            confirmed: true,
            room: conformCode,
          })
          delete codes[conformCode]
        } else {
          socket.emit(ConnectionEvents.REQUEST__MANUALCODE_CONFIRMED, {
            confirmed: false,
          })
        }
      }
    )

    socket.on(ConnectionEvents.SEND_DATA, (data) => {
      let room = "room-" + data.roomId
      io.to(room).emit(ConnectionEvents.RECEIVE_DATA, {
        sender: socket.id,
        message: data.message,
      })
    })

    socket.on("disconnect", () => {
      let client = socket.device
      if (client && client.deviceId) {
        let currentSocket = io.sockets.sockets.get(client.deviceId)
        io.to(client.room).emit(
          ConnectionEvents.UPDATE_OTHERDEVICE_DISCONNECTED,
          {
            isDisconnect: true,
            socketId: socket.id,
          }
        )
        socket.device = null
        if (currentSocket) {
          currentSocket.device = null
        }
      }
    })
  })
}

module.exports = { initSocket }
