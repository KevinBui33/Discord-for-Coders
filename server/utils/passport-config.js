const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("../db/db");

const initalize = (passport) => {
  const authenticateUser = async (email, password, done) => {
    // Search for user in DB
    await db
      .query("SELECT * FROM accounts WHERE email = $1", [email])
      .then(async (res) => {
        const user = res.rows[0];
        console.log(user);
        if (await bcrypt.compare(password, user.password)) {
          return done(null, res);
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      })
      .catch((err) => done(err));
  };
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((data, done) => {
    const user = data.rows[0];
    return done(null, user.user_id);
  });
  passport.deserializeUser(async (id, done) => {
    console.log(id);
    const user = await db.query("SELECT * FROM accounts WHERE user_id = $1", [
      id,
    ]);
    return done(null, user);
  });
};

module.exports = initalize;
