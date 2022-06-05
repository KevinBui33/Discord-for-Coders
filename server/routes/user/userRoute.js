const express = require("express");
const db = require("../../db/db");
const router = express.Router();

router.get("/users", async (req, res) => {
  console.log("Getting all users");
  console.log(req.query);

  const { username } = req.query;

  await db
    .query(
      "SELECT * FROM accounts WHERE LOWER(username) LIKE LOWER($1) || '%'",
      [username]
    )
    .then((data) => res.json(data.rows))
    .catch((err) => console.log(err));
});

module.exports = router;
