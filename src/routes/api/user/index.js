const express = require("express");
const login = require("./login.js");
const clientRegister = require("./clientRegister.js");
const courierRegister = require("./courierRegister.js");
const clientErrands = require("./clientErrands.js");
const clientHistory = require("./clientHistory.js");
const info = require("./info.js");
const addPackage = require("./addPackage.js");
const removePackage = require("./removePackage.js");
const updateStatus = require("./updateStatus.js");
const auth = require("../../../services/auth.js");


const router = express.Router();

router.post("/login", login);
router.post("/client-register", clientRegister);
router.post('/courier-register', courierRegister);
router.post('/info', auth, info);
router.post('/client-errands', auth, addPackage);

router.get('/client-errands', auth, clientErrands);
router.get('/client-history', auth, clientHistory);

router.patch('/update-status/:packageUuid', auth, updateStatus);

router.delete('/client-errands/:packageUuid', auth, removePackage)

module.exports = router;