const db = require("./db/db");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;

module.exports = (passport) => {
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
};
