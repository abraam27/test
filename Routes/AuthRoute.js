const express = require("express");
const router = express.Router();
const LoginController = require("../Controllers/LoginController");

// login User
router.post("/",LoginController.UserLogin);
module.exports = router