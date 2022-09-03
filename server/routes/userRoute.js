const express = require("express");
const db = require("../db/db");
const jwt = require("jsonwebtoken");
const { route } = require("./credentailsRoute");
const { getUserInfo } = require("../utils/helper");
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

/**
 * Get currently logged user infomation
 */
router.get("/user", async (req, res) => {
  const user = req.user;

  await db
    .query("SELECT * FROM accounts WHERE user_id = $1", [user.user_id])
    .then((data) => {
      const { rows } = data;
      if (rows[0]) {
        console.log(`user: ${JSON.stringify(rows[0])}`);
        res.json(rows[0]);
      }
    })
    .catch((err) => console.log(err));
});

/**
 * Route for getting all friends
 */
router.get("/friends", async (req, res) => {
  const { type } = req.query;
  const user = req.user;

  console.log(`Getting \"${type}\" friends for user: ${user.user_id}`);

  let queryStr = "";
  let queryParams;

  // Pending: 0, friend: 1, blocked: 2

  // TODO: Make the online search get only ppl who are online by socket io
  switch (type) {
    case "online":
      queryStr += "SELECT * FROM friendship WHERE user_b = $1 AND status = 1";
      queryParams = [user.user_id];
      break;
    case "all":
      queryStr += "SELECT * FROM friendship WHERE user_b = $1 AND status = 1";
      queryParams = [user.user_id];
      break;
    case "pending":
      queryStr += "SELECT * FROM friendship WHERE user_b = $1 AND status = 0";
      queryParams = [user.user_id];
      break;
  }

  // TODO: rename variables for dynamic querys
  try {
    const friendRequests = (await db.query(queryStr, queryParams))?.rows;
    console.log("==== Friend requests ====");
    console.log(friendRequests);

    const requestsAccounts = await Promise.all(
      friendRequests.map((f) => getUserInfo(f.user_a))
    );
    console.log(requestsAccounts);
    res.json({ requests: requestsAccounts });
  } catch (err) {
    // TODO: send error to client
    console.log(err);
  }
});

/**
 * Accept/Decline friend request
 */
router.post("/friends", async (req, res) => {
  const { status, userId } = req.body;
  const user = req.user;

  // Status true = accept friend

  try {
    if (status) {
      const update = await db.query(
        "UPDATE friendship SET status = 1 WHERE user_a = $1 AND user_b = $2",
        [userId, user.user_id]
      );

      if (!update) return res.status(400).send("Friend Request did not work");

      const remainingRequest = await db.query(
        "SELECT * FROM friendship WHERE user_b = $1 AND status = 0",
        [user.user_id]
      );

      const requestAccount = await Promise.all(
        remainingRequest?.rows.map((r) => getUserInfo(r.user_a))
      );

      console.log(requestAccount);
      res.send({ requestAccount });
    } else {
      console.log("declining things");
      const decline = await db.query(
        "DELETE FROM friendship WHERE user_a = $1 AND user_b = $2",
        [userId, user.user_id]
      );

      if (!decline) return res.status(400).send("Decline did not work");

      const remainingRequest = await db.query(
        "SELECT * FROM friendship WHERE user_b = $1 AND status = 0",
        [user.user_id]
      );

      const requestAccount = await Promise.all(
        remainingRequest?.rows.map((r) => getUserInfo(r.user_a))
      );

      console.log(requestAccount);
      res.send({ requestAccount });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

// cb({ msg: "Accepted Friend", data: data.rows })
