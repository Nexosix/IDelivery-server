const express = require("express");
const login = require("./login.js");
const clientRegister = require("./clientRegister.js");
const courierRegister = require("./courierRegister.js");
const test = require("./test.js");
const auth = require("../../../services/auth.js");


const router = express.Router();

router.post("/login", login);
router.post("/client-register", clientRegister);
router.post('/courier-register', courierRegister);
router.post('/test', auth, test);

module.exports = router;