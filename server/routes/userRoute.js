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

router.get("/friends", async (req, res) => {
  console.log(req.header);
  const { type } = req.query;
  // const user = jwt.decode(token);

  // console.log(`Getting ${type} users for ${user.user_id}`);

  // let queryStr = "";
  // let queryParams;

  // switch (type) {
  //   case "online":
  //     break;
  //   case "all":
  //     break;
  //   case "pending":
  //     queryStr += "SELECT * FROM friendship WHERE user_b = $1 AND status = 0";
  //     queryParams = [user.user_id];
  //     break;
  // }

  // try {
  //   const friendRequests = (await db.query(queryStr, queryParams)).rows;

  //   console.log("Ppl who sent you a friend request");
  //   const requestsAccounts = await Promise.all(
  //     friendRequests.map(async (f) => {
  //       try {
  //         console.log(f);
  //         const friend = await db.query(
  //           "SELECT * FROM accounts WHERE user_id = $1",
  //           [f.user_a]
  //         );

  //         console.log(friend);
  //         return friend.rows[0];
  //       } catch (err) {
  //         throw err;
  //       }
  //     })
  //   );
  //   console.log(requestsAccounts);
  //   res.json({ requests: requestsAccounts });
  // } catch (err) {
  //   // TODO: send error to client
  //   console.log(err);
  // }
});

module.exports = router;
