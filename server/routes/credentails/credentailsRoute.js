const express = require("express");
const credController = require("../../controller/credentailController.js");
const router = express.Router();

router.post("/login", credController.login);
router.post("/register", credController.register);

module.exports = router;
