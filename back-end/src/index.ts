import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
// import { Server as SocketIOServer, Socket } from "socket.io";
import { createServer  } from "http";
import { generateRandomString } from "./utils/generateRandomString";
dotenv.config();

const app: Express = express();
// app.use(cors());
const port = process.env.PORT;
// const server = createServer(app);
// const io = new SocketIOServer(server, {
//   cors: {
//     origin: "*",
//   },
// });

app.get("/ok", (req: Request, res: Response) => {
  res.send("Express + TypeScript Serversdf 10");
});

// Attach socket.io to the server

// The correct code for clients to connect

// Listen for new connections from clients
// io.on("connection", (socket: Socket) => {
//   const correctCode = generateRandomString();
//   console.log("Client connected, awaiting code...");
//   socket.emit("get-new-code", correctCode);
//   // Listen for the code from the client
//   socket.on("code", (code: string) => {
//     if (code === correctCode) {
//       console.log("Client provided the correct code!");

//       // Emit an event to confirm the connection
//       socket.emit("code-validated", true);

//       // Now listen for further messages or events
//       socket.on("message", (msg: string) => {
//         console.log("message:", msg);
//         // process messages
//       });
//     } else {
//       console.log("Client provided an incorrect code.");
//       socket.emit("code-validated", false);
//       socket.disconnect(); // Optionally disconnect the client
//     }
//   });

 
// });
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
