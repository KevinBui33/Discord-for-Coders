if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const PORT = 5000 | process.env.PORT;

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const pgSession = require("connect-pg-simple")(session);
const { Server } = require("socket.io");
const passport = require("passport");
const app = express();
const server = require("http").createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

//Routes
const credRoute = require("./routes/credentails/credentailsRoute");
const userRoute = require("./routes/user/userRoute");

const { addFriend } = require("./controller/socketController");
const { pool } = require("./db/db");

// Connect to DB

// Setup for session storage and express link
const sessionMiddleware = session({
  store: new pgSession({
    pool: pool,
  }),
  secret: "secret",
  resave: false,
  saveUninitialized: false,
});

// Express setup
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("secret"));

// Add passport to express
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(credRoute);
app.use(userRoute);

require("./utils/passport-config")(passport);

app.get("/test", (req, res) => {
  console.log(req.isAuthenticated());
  console.log(req.session);

  const isAuthenticated = !!req.user;
  if (isAuthenticated) {
    console.log(`user is authenticated, session is ${req.session.id}`);
  } else {
    console.log("unknown user");
  }
  res.send(req.user);
});

// Socket stuff
const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

io.use((socket, next) => {
  if (socket.request.user) {
    next();
  } else {
    console.log("An error occured ");
    next();
  }
});

// TODO: Move socket io to another file
io.on("connect", (socket) => {
  console.log(`user connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("whoami", (cb) => {
    console.log("whoami being called");
    console.log(socket.request.session);
    cb(socket.request.user);
  });
});

server.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});
