const express = require("express");

const router = express.Router();
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");
const { add, getAll } = require("../controllers/product");

// User routes

router.route("/add").post(isAuthenticated, authorizeRoles("Admin"), add);
router.route("/get-all").get(isAuthenticated, getAll);

module.exports = router;
