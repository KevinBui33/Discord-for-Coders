const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

var PORT = 5000 | process.env.PORT;

app.use(cors());

app.get("/", (req, res) => {
  console.log("Got request");
  res.send("Hello World");
});

io.on("connection", (socket) => {
  console.log("New user has conected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});
