const bcrypt = require("bcrypt");
const passport = require("passport");
const db = require("../db/db");

const register = async (req, res) => {
  try {
    // Hash password
    const hashedPass = await bcrypt.hash(req.body.password, 10);

    // insert new account to DB
    const { username, email, created_on } = req.body;
    await db
      .query(
        "INSERT INTO accounts(username, password, email, created_on) VALUES($1, $2, $3, $4) RETURNING *",
        [username, hashedPass, email, created_on]
      )
      .then((data) => {
        res.status(200);
        res.json(data.rows[0]);
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.error(err);
  }
};

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("User does not exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("sucessful authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
};

const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  }
  res.redirect("/login");
};

const checkNotAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/chat");
  }

  next();
};

module.exports = {
  register,
  login,
  checkAuth,
  checkNotAuth,
};
