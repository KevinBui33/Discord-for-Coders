const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("../db/db");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        // Search for user in DB
        await db
          .query("SELECT * FROM accounts WHERE email = $1", [email])
          .then(async (res) => {
            const user = res.rows[0];
            if (await bcrypt.compare(password, user.password)) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Incorrect password" });
            }
          })
          .catch((err) => done(err));
      }
    )
  );

  passport.serializeUser((user, done) => {
    return done(null, user.user_id);
  });

  passport.deserializeUser(async (id, done) => {
    const data = await db.query("SELECT * FROM accounts WHERE user_id = $1", [
      id,
    ]);

    return done(null, data.rows[0]);
  });
};
