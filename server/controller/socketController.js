const db = require("../db/db");

module.exports.addFriend = async (socket, friendName, cb) => {
  console.log(friendName);

  const res = await db.query(
    "SELECT user_id, username, email FROM accounts WHERE username = $1",
    [friendName]
  );
  console.log(res.rows);

  const user = res.rows[0];

  if (user == null) cb({ done: false, err: "User does not exist" });
};
