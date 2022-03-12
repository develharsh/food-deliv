const express = require("express");

const router = express.Router();
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");
const { add } = require("../controllers/subcategory");

// User routes

router.route("/add").post(isAuthenticated, authorizeRoles("Admin"), add);

module.exports = router;
