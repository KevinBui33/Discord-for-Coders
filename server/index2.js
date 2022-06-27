const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const socketioJwt = require("socketio-jwt");
const localStrategy = require("passport-local").Strategy;
const db = require("./db/db");
const { Server } = require("socket.io");

const app = express();
const server = require("http").createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 5000;

const sessionMiddleware = session({
  secret: "mysecret",
  resave: true,
  saveUninitialized: false,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser("mysecret"));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new localStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      console.log("finding user");
      await db
        .query("SELECT * FROM accounts WHERE email = $1", [email])
        .then(async (res) => {
          const user = res.rows[0];

          if (await bcrypt.compare(password, user.password)) {
            console.log("authentication OK");
            return done(null, user);
          } else {
            console.log("wrong credentials");
            return done(null, false);
          }
        })
        .catch((err) => done(err));
    }
  )
);

passport.serializeUser((user, cb) => {
  console.log(`serializing user: ${user.user_id}`);
  cb(null, user.user_id);
});

passport.deserializeUser(async (id, cb) => {
  console.log(`deserializing user: ${id}`);
  await db
    .query("SELECT * FROM accounts WHERE user_id = $1", [id])
    .then((res) => {
      const user = res.rows[0];
      cb(null, user);
    })
    .catch((err) => cb(err, null));
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log("authenigcating user with passport");
    if (err) throw err;
    if (!user) res.send("User does not exists");
    else {
      let token = jwt.sign({ user_id: user.user_id }, "mysecret");
      console.log(jwt.verify(token, "mysecret"));
      console.log(token);
      res.send(token);
    }
  })(req, res, next);
});

io.use(
  socketioJwt.authorize({
    secret: "mysecret",
    handshake: true,
  })
);

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  io.on("whoami", (cb) => {
    cconsole.log("who am i gettting called");
    cb("getting call back from server");
  });
});

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
