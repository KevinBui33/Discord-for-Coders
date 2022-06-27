const express = require("express");
const passport = require("passport");
const credController = require("../../controller/credentailController.js");
const router = express.Router();

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log("authenigcating user with passport");
    if (err) throw err;
    if (!user) res.send("User does not exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        // console.log(req.user);
        return res.redirect("/test");
      });
    }
  })(req, res, next);
});

router.post("/register", credController.checkNotAuth, credController.register);

router.get("/test", (req, res) => {
  const isAuthenticated = !!req.user;
  if (isAuthenticated) {
    console.log(`user is authenticated, session is ${req.session.id}`);
  } else {
    console.log("unknown user");
  }

  return res.send("it worked");
});

module.exports = router;
