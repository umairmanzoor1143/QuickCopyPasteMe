const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const http = require("http")
const { initSocket } = require("./sockets")
const app = express()
dotenv.config()
app.use(cors())
const port = process.env.PORT || 8000
const server = http.createServer(app)
initSocket(server)

app.get("/", (req, res) => {
  res.send("Express + TypeScript Serversdf 10")
})

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
