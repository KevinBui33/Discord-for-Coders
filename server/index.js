const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

var PORT = 5000 | process.env.PORT;

app.use(cors());

app.get("/", (req, res) => {
  console.log("Got request");
  res.send("Hello World");
});

io.on("connection", (socket) => {
  console.log(`User connect: ${socket.id}`);

  socket.on("join", () => {
    socket.join(socket.id);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("send_msg", (data) => {
    console.log(data);
  });
});

server.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});
