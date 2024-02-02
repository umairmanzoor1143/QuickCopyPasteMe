import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { initSocket } from "./sockets/index";
const app: Express = express();
dotenv.config();
app.use(cors());
const port = process.env.PORT || 5000;
const server = createServer(app);
initSocket(server);

app.get("/ok", (req: Request, res: Response) => {
  res.send("Express + TypeScript Serversdf 10");
});

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
