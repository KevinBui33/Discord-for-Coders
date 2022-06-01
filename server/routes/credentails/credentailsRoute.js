const express = require("express");
const passport = require("passport");
const credController = require("../../controller/credentailController.js");
const router = express.Router();

router.post(
  "/login",
  credController.checkNotAuth,
  passport.authenticate("local", { failureMessage: true }),
  credController.login
);
router.post("/register", credController.checkNotAuth, credController.register);

module.exports = router;
