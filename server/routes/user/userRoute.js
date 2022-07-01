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

// =========================== FRIEND REQUEST STUFF ===========================

router.post("friend", async (req, res) => {
  try {
    console.log(req.body.to);
    const currentUser = req.user;

    // Check if you are not adding yourself
    if (friendName === currentUser.username)
      cb({ done: false, err: "Cannot add yourself" });

    const res = await db.query(
      "SELECT user_id, username, email FROM accounts WHERE username = $1",
      [friendName]
    );
    console.log(res.rows);
    const addUser = res.rows[0];

    // Check if user exists
    if (addUser === null) cb({ done: false, err: "User does not exist" });

    // Check if user is not already your friend
    const isFriend = await db.query(
      "SELECT EXISTS (SELECT 1 FROM friends WHERE user_a = $1 AND user_b = $2)",
      [currentUser.user_id, addUser.user_id]
    );

    console.log(isFriend.rows[0]);
    if (isFriend.rows[0].exists)
      cb({ done: false, err: "Already friends with them" });

    // Add user to friends table (change this so that it sends a request instead of directly adding it)

    // Emit friend request to adding user

    // cb({ done: true });

    //
  } catch (err) {
    console.log(err);
    cb({ done: false, err: err });
  }
});

module.exports = router;
