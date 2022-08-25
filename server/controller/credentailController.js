const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const db = require("../db/db");

const register = async (req, res) => {
  try {
    // Hash password
    console.log(req.body);
    const hashedPass = await bcrypt.hash(req.body.password, 10);

    // Insert new account to DB
    const { username, email, created_on } = req.body;
    await db
      .query(
        "INSERT INTO accounts(username, password, email, created_on) VALUES($1, $2, $3, $4) RETURNING *",
        [username, hashedPass, email, created_on]
      )
      .then((data) => {
        return res.status(201).send({ msg: "Account created!" });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.error(err);
  }
};

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log("authenigcating user with passport");
    if (err) throw err;
    if (!user) {
      res.status(401);
      res.send(info.message);
    } else {
      let token = jwt.sign(
        { user_id: user.user_id, username: user.username },
        "mysecret"
      );

      res
        .cookie("jwt", token, {
          httpOnly: true,
        })
        .json({ token });
    }
  })(req, res, next);
};

module.exports = {
  register,
  login,
};
