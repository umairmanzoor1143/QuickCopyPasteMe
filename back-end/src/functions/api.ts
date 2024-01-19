import express, { Express, Request, Response } from "express";
import serverless from "serverless-http";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const app: Express = express();
// app.use(cors());
// const server = createServer(app);
// const io = new SocketIOServer(server, {
//   cors: {
//     origin: "*",
//   },
// });


router.get('/ok', (req, res) => {
  res.send('App is running..');
});
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
// app.listen(port, () => {
//   console.log(`[server]: server is running at http://locallhost:${port}`);
// });
app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);