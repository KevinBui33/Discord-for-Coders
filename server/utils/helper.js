const db = require("../db/db");

module.exports = {
  getUserInfo: async (userId) => {
    try {
      const res = await db.query(
        "SELECT user_id, email, username FROM accounts WHERE user_id = $1",
        [userId]
      );

      return res.rows[0];
    } catch (err) {
      return err;
    }
  },
};
