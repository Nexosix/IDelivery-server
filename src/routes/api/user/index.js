const express = require("express");
const login = require("./login.js");
const clientRegister = require("./clientRegister.js");
const router = express.Router();

router.post("/login", login);
router.post("/client-register", clientRegister);

module.exports = router;