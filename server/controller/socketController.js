const db = require("../db/db");

module.exports = (io, socket, linkedUsers) => {
  console.log(`user connected: ${socket.id}`);
  console.log(`user id: ${socket.decoded_token.user_id}`);

  const disconnectUser = () => {
    const userId = linkedUsers.find((x) => x.clientId === socket.id);
    console.log(userId);

    linkedUsers = linkedUsers.filter((item) => item.userId !== userId.userId);
    console.log(`User ${userId.userId} has dissconnected`);
  };

  const storeClientInfo = () => {
    const user = {
      clientId: socket.id,
      userId: socket.decoded_token.user_id,
    };

    // Need to keep storage in a different place (maybe try redis)
    linkedUsers.push(user);
    console.log(linkedUsers);
  };

  const sendFriendRequst = async (friendName, cb) => {
    console.log(`sending friend request to: ${friendName}`);
    const fromUser = socket.decoded_token;

    // Check if user are not adding themself
    if (fromUser.username === friendName)
      cb({ done: false, err: "Cannot add yourself" });

    let res;

    // Check if this user exits
    res = await db.query(
      "SELECT user_id, username, email FROM accounts WHERE username = $1",
      [friendName]
    );
    const toUser = res.rows[0];
    console.log(toUser);

    if (toUser === null) cb({ done: false, err: "User does not exsits" });

    // Check if friend is not already a friend
    res = await db.query(
      "SELECT EXISTS (SELECT 1 FROM friends WHERE user_a = $1 AND user_b = $2)",
      [fromUser.user_id, toUser.user_id]
    );

    if (res.rows[0].exists)
      cb({ done: false, err: "Already friends with this person" });

    // Check if there is already a friend request
    res = await db.query(
      "SELECT EXISTS (SELECT 1 FROM friendrequests WHERE user_from = $1 AND user_to = $2)",
      []
    );

    // Add friend to request table
    await db.query(
      "INSERT INTO friendrequests(user_from, user_to, status) VALUES($1, $2, $3);",
      [fromUser.user_id, toUser.user_id, "pending"]
    );

    // Send notification (socket)/ save to notification DB

    const fromUserClientId = linkedUsers.find(
      (x) => x.userId === fromUser.user_id
    );

    console.log(fromUserClientId);

    // io.to();
  };

  socket.on("store_client_info", storeClientInfo);
  socket.on("send_friend_request", sendFriendRequst);
  socket.on("disconnect", disconnectUser);
};
