const credController = require("../../controller/credentailController.js");
const router = require("express").Router();

router.post("/login", credController.checkAuth, credController.login);

router.post("/register", credController.checkNotAuth, credController.register);

module.exports = router;
