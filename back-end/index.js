const express = require("express")
const app = express()
require("dotenv").config()
require("./db")
const PORT = process.env.PORT || 8080
const userRoutes = require("./routes/userRoutes")
app.use(express.json())

app.get("/", (req, res) => {
  res.send("products api running new deploy")
})

app.get("/ping", (req, res) => {
  res.send("PONG")
})

// /users
app.use("/users", userRoutes)

app.listen(8080, () => {
  console.log("Server is listenin on PORT :" + PORT)
})
