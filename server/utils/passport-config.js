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
              console.log("authentication OK");
              return done(null, user);
            } else {
              console.log("wrong credentials");
              return done(null, false, { message: "Incorrect password" });
            }
          })
          .catch((err) => done(err));
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log(`serializeUser ${user.user_id}`);
    done(null, user.user_id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const data = await db.query("SELECT * FROM accounts WHERE user_id = $1", [
        id,
      ]);
      console.log(`deserializeUser ${id}`);
      done(null, data.rows[0]);
    } catch (err) {
      done(err);
    }
  });
};
