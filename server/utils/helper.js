module.exports = {
  getUser: (username) => {
    console.log("yes sir" + username);
  },

  removeUser: (socketId) => {
    console.log("removing user" + socketId);
  },
};
