const express = require("express");
const db = require("../db/db");
const jwt = require("jsonwebtoken");
const { route } = require("./credentailsRoute");
const router = express.Router();

// Getting all users based off name
router.get("/users", async (req, res) => {
  console.log("Getting all users");

  const { username } = req.query;

  await db
    .query(
      "SELECT * FROM accounts WHERE LOWER(username) LIKE LOWER($1) || '%' AND user_id != $2",
      [username, req.user.user_id]
    )
    .then((data) => res.json(data.rows))
    .catch((err) => console.log(err));
});

router.get("/friend", async (req, res) => {
  console.log(req.query);
  const { type } = req.query;

  console.log(`Getting ${type} users`);

  let queryStr = "SELECT * FROM accounts WHERE ";

  switch (type) {
    case "online":
      break;
    case "all":
      break;
    case "pending":
      queryStr += "";
      break;
  }
});

module.exports = router;
