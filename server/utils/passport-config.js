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

            if (user === null)
              done(null, false, { message: "User does not exists" });

            await bcrypt
              .compare(password, user.password)
              .then((res) => {
                if (res) {
                  console.log("authentication OK");
                  return done(null, user);
                }
                console.log("wrong credentials");
                return done(null, false, { message: "Incorrect password" });
              })
              .catch((err) => {
                console.log("An error occured when comparing passwords");
                console.log(err);
                done(null, false, { message: new Error("bcrypt error") });
              });
          })
          .catch((err) =>
            done(null, false, { message: "User does not exits" })
          );
      }
    )
  );

  passport.serializeUser((user, cb) => {
    console.log(`serializeUser ${user.user_id}`);
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
