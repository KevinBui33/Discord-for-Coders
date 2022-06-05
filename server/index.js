const express = require("express");
const cors = require("cors");
const http = require("http");
const flash = require("express-flash");
const session = require("express-session");
const db = require("./db/db");
const { Server } = require("socket.io");
const credRoute = require("./routes/credentails/credentailsRoute");
const userRoute = require("./routes/user/userRoute");
const passport = require("passport");

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
app.use(flash());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(credRoute);
app.use(userRoute);

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
