if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const http = require("http");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const db = require("./db/db");
const { Server } = require("socket.io");

const credRoute = require("./routes/credentails/credentailsRoute");
const userRoute = require("./routes/user/userRoute");

const passport = require("passport");
const { addFriend } = require("./controller/socketController");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

var PORT = 5000 | process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser("secret"));
app.use(passport.initialize());
app.use(passport.session());
require("./utils/passport-config")(passport);

app.use(credRoute);
app.use(userRoute);

// app.get("/getuser", (req, res) => {
//   res.send(req.user);
// });

// TODO: Move socket io to another file
io.on("connection", (socket) => {
  console.log(`User connect: ${socket.id}`);

  // socket.on("join", () => {
  //   socket.join(socket.id);
  // });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("send_msg", (data) => {
    console.log(data);
  });

  socket.on("add_friend", addFriend);
});

server.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});
