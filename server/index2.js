const path = require("path");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());

function onConnection(socket) {
  socket.on("drawing", (data) => {
    socket.broadcast.emit("drawing", data);
  });

  socket.on("clearCanvas", () => socket.broadcast.emit("clearCanvas"));
}

io.on("connection", onConnection);

// app.get("/*", (req, res) => {
//   const filePath = path.join(__dirname, "proto", "index.html");
//   res.sendFile(filePath);
// });

http.listen(port, () => console.log("listening on port " + port));
