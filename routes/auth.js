const express = require("express");

const router = express.Router();
//const { isAuthenticated } = require("../middlewares/auth");
const { signup, login } = require("../controllers/auth");

// User routes

router.route("/signup").post(signup);
router.route("/login").post(login);

module.exports = router;
