const bcrypt = require("bcrypt");
const db = require("../db/db");

const checkAuth = (req, res, next) => {};

const register = async (req, res) => {
  try {
    // Hash password
    console.log(req.body);
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    // insert new account to DB

    const { username, email, created_on } = req.body;
    const newAcc = await db.query(
      "INSERT INTO accounts (username, password, email, created_on) VALUES($1, $2, $3, $4)",
      [username, hashedPass, email, created_on]
    );

    console.log(newAcc);

    res.json(newAcc);
  } catch (err) {
    // send error msg
  }
};

const login = (req, res) => {};

module.exports = {
  register,
  login,
};
