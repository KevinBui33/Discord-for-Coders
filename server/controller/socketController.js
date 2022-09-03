const db = require("../db/db");

module.exports = (io, socket) => {
  console.log(`user connected: ${socket.auth.io} - socket id: ${socket.id}`);
  console.log(`user id: ${socket.auth.decode.user_id}`);

  /**
   * Linking socket client id to a user
   */
  const linkUser = async () => {
    const { user_id } = socket.auth.decode;
    await db
      .query(
        "INSERT INTO linked_users(user_id, socket_id) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET socket_id = $2",
        [user_id, socket.id]
      )
      .catch((err) => console.log(err));
  };

  /**
   * Disconnecting user from socket server
   */
  const disconnect = async () => {
    const { user_id } = socket.auth.decode;

    await db
      .query("DELETE FROM linked_users WHERE user_id = $1", [user_id])
      .catch((err) => console.log(err));
  };

  /**
   * Send friend request to user
   */
  const sendFriendRequst = async (friendName, cb) => {
    console.log(`sending friend request to: ${friendName}`);
    const { decode } = socket.auth;

    // Check if user are not adding themself
    if (decode.username === friendName)
      return cb({ done: false, err: "Cannot add yourself" });

    let res;

    try {
      res = await db.query(
        "SELECT user_id, username, email FROM accounts WHERE username = $1",
        [friendName]
      );
      const toUser = res.rows[0];
      console.log(toUser);

      if (!toUser) {
        return cb({ done: false, err: "User does not exsits" });
      }

      // Check if user is not already a friend
      res = await db.query(
        "SELECT EXISTS (SELECT 1 FROM friendship WHERE user_a = $1 AND user_b = $2 AND status = 1)",
        [decode.user_id, toUser.user_id]
      );

      if (res.rows[0].exists)
        return cb({ done: false, err: "Already friends with this person" });

      // Check if there is already a friend request
      res = await db.query(
        "SELECT EXISTS (SELECT 1 FROM friendship WHERE user_a = $1 AND user_b = $2 AND status = 0)",
        [decode.user_id, toUser.user_id]
      );

      if (res.rows[0].exists)
        return cb({ done: false, err: "Friend request already sent" });

      // Add friend to request table
      await db.query(
        "INSERT INTO friendship(user_a, user_b, status) VALUES($1, $2, $3);",
        [decode.user_id, toUser.user_id, 0]
      );

      // Save notification
      await db.query(
        "INSERT INTO notification(notification_type_id, sender_id, recipient_id) values($1, $2, $3)",
        [1, decode.user_id, toUser.user_id]
      );

      // Send notifcation to user
      res = await db.query("SELECT * FROM linked_users WHERE user_id = $1", [
        toUser.user_id,
      ]);

      if (res.rows[0]) {
        console.log(res.rows[0]);
        socket.to(res.rows[0].socket_id).emit("friend_request", {
          senderName: decode.username,
          done: true,
        });
      }

      cb({ done: true });
    } catch (err) {
      console.log(err);
      cb({ done: false, err: "Something happened" });
    }
  };

  const sendMessage = () => {};
  socket.on("disconnect", disconnect);
  socket.on("link_user", linkUser);
  socket.on("friend_request", sendFriendRequst);
  socket.on("send_msg", sendMessage);
};
