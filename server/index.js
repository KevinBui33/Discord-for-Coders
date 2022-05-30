const express = require("express");
const cors = require("cors");
const http = require("http");
const db = require("./db/db");
const { Server } = require("socket.io");

const credRoute = require("./routes/credentails/credentailsRoute");

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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const accs = await db.query("select * from accounts", []);
  res.json(accs.rows);
});

app.use(credRoute);

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
