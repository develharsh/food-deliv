const express = require("express");
const router = express.Router();
//const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

// @Base Url
router.use((req, res, next) => {
  req["currentUrl"] = `${req.protocol + "://" + req.headers.host}`;
  next();
});

// @Auth
const Auth = require("./auth");
router.use("/auth", Auth);

// @Product
const Product = require("./product");
router.use("/product", Product);

// @Category
const Category = require("./category");
router.use("/category", Category);

// @SubCategory
const SubCategory = require("./subcategory");
router.use("/subcategory", SubCategory);

module.exports = router;
