const express = require("express");
const db = require("../../db/db");
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

// Sending friend request to user
router.post("/user", async (req, res) => {
  console.log("Sending friend request");

  // const user_a = req.user.user_id;
  // const user_b = req.body.user_id;

  // console.log(user_a, user_b);

  // await db
  //   .query("INSERT INTO friends (user_a, user_b) VALUES ($1, $2)", [
  //     user_a,
  //     user_b,
  //   ])
  //   .then((data) => {
  //     res.status(200);
  //     return res.json(data.rows);
  //   })
  //   .catch((err) => console.log(err));
});
module.exports = router;
