const db = require("../db/db");

module.exports.addFriend = async (socket, friendName, cb) => {
  try {
    console.log(friendName);
    const currentUser = socket.decoded_token;

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
    // await db.query("INSERT INTO friends(user_a, user_b) VALUES($1, $2)", [
    //   currentUser.user_id,
    //   addUser.user_id,
    // ]);

    // cb({ done: true });

    //
  } catch (err) {
    console.log(err);
    cb({ done: false, err: err });
  }
};
