const errorResponse = require("../utils/errorResponse");
const catchAsync = require("../middlewares/catchAsync");
const {
  validateAddProduct,
  validateGetAllProducts,
} = require("../middlewares/validatePayload");
//const mongoose = require("mongoose");
const Product = require("../models/product");
//const sendEmail = require("../services/sendEmail");

exports.add = catchAsync(async (req, res) => {
  try {
    req.body = validateAddProduct(req.body);
    console.log(req.body);
    const product = await Product.create(req.body);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    errorResponse(res, error);
  }
});

exports.getAll = catchAsync(async (req, res) => {
  try {
    req = validateGetAllProducts(req);
    console.log(req.body);
    const products = await Product.find(req.body);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    errorResponse(res, error);
  }
});
