if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const PORT = 5000 | process.env.PORT;

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");
const pgSession = require("connect-pg-simple")(session);

const app = express();
const server = require("http").createServer(app);

const credRoute = require("./routes/credentailsRoute");
const userRoute = require("./routes/userRoute");

const socketController = require("./controller/socketController");

const { pool } = require("./db/db");
const { verifyJWT } = require("./middleware/verifyJWT");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },

  cookie: true,
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
app.use(cookieParser());

// Add passport to express
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.all("*", verifyJWT);

app.use(credRoute);
app.use(userRoute);

require("./utils/passport-config")(passport);

// Socket stuff

// Authentication middle ware
io.use((socket, next) => {
  if (socket.handshake.headers.cookie) {
    const cookies = cookie.parse(socket.handshake.headers.cookie);

    try {
      const decode = jwt.verify(cookies.jwt, "mysecret");
      cookies["decode"] = decode;
      socket.auth = cookies;
      next();
    } catch (err) {
      next(new Error("No JWT token"));
    }
  }
});

//  Socket get user token (decoded_token) shows stuff about the token
io.on("connection", (socket) => socketController(io, socket));

server.listen(PORT, () => console.log(`server listening on port: ${PORT}`));
