const express = require("express");
const login = require("./login.js");
const register = require("./register.js");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);

module.exports = router;