const db = require("../db/db");

module.exports = (io, socket) => {
  console.log(`user connected: ${socket.id}`);
  // console.log(`user id: ${socket.decoded_token.user_id}`);
  console.log(`user token: ${JSON.stringify(socket.auth)}`);

  const disconnectUser = async () => {
    // Find user to disconnect
    const user = await db.query(
      "SELECT * FROM linked_users WHERE user_id = $1",
      [socket.decoded_token.user_id]
    );

    console.log(`User: ${JSON.stringify(user.rows)}`);

    // Throw error if user is not connected to socket
    if (!user.rows[0]) {
      return new Error("User was not connected to socket instance");
    }

    // Delete socket id once user dissconect
    await db.query("DELETE FROM linked_users WHERE user_id = $1", [
      socket.decoded_token.user_id,
    ]);
  };

  const sendFriendRequst = async (friendName, cb) => {
    console.log(`sending friend request to: ${friendName}`);
    const fromUser = socket.decoded_token;

    // Check if user are not adding themself
    if (fromUser.username === friendName)
      return cb({ done: false, err: "Cannot add yourself" });

    let res;

    // Check if this user exits
    res = await db.query(
      "SELECT user_id, username, email FROM accounts WHERE username = $1",
      [friendName]
    );
    const toUser = res.rows[0];
    console.log(toUser);

    if (toUser === null) cb({ done: false, err: "User does not exsits" });

    // Check if user is not already a friend
    res = await db.query(
      "SELECT EXISTS (SELECT 1 FROM friendship WHERE user_a = $1 AND user_b = $2 AND status = 1)",
      [fromUser.user_id, toUser.user_id]
    );

    if (res.rows[0].exists)
      return cb({ done: false, err: "Already friends with this person" });

    // Check if there is already a friend request
    res = await db.query(
      "SELECT EXISTS (SELECT 1 FROM friendship WHERE user_a = $1 AND user_b = $2 AND status = 0)",
      [fromUser.user_id, toUser.user_id]
    );

    if (res.rows[0].exists)
      return cb({ done: false, err: "Friend request already sent" });

    // Add friend to request table
    await db.query(
      "INSERT INTO friendship(user_a, user_b, status) VALUES($1, $2, $3);",
      [fromUser.user_id, toUser.user_id, 0]
    );

    // Save notification
    await db.query(
      "INSERT INTO notification(notification_type_id, sender_id, recipient_id) values($1, $2, $3)",
      [1, fromUser.user_id, toUser.user_id]
    );

    // Send notifcation to user
    const toUserClientId = linkedUsers.find((x) => x.userId === toUser.user_id);

    console.log(toUserClientId);

    if (toUserClientId) {
      io.to(toUserClientId.clientId).emit("get_friend_request", {
        senderName: fromUser,
      });
    }

    cb({ done: true });
  };

  const sendMessage = () => {};

  socket.on("send_friend_request", sendFriendRequst);
  socket.on("send_msg", sendMessage);
  socket.on("disconnect", disconnectUser);
};
