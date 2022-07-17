if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const PORT = 5000 | process.env.PORT;

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const socketioJwt = require("socketio-jwt");
const { Server } = require("socket.io");
const pgSession = require("connect-pg-simple")(session);

const app = express();
const server = require("http").createServer(app);

const credRoute = require("./routes/credentailsRoute");
const userRoute = require("./routes/userRoute");

const socketController = require("./controller/socketController");

const { pool } = require("./db/db");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

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
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("secret"));

// Add passport to express
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(credRoute);
app.use(userRoute);

require("./utils/passport-config")(passport);

// Socket stuff
io.use(
  socketioJwt.authorize({
    secret: "mysecret",
    handshake: true,
  })
);

//  Socket get user token (decoded_token) shows stuff about the token
const linkedUsers = [];
io.on("connection", (socket) => socketController(io, socket, linkedUsers));

server.listen(PORT, () => console.log(`server listening on port: ${PORT}`));
