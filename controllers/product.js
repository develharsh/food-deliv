const errorResponse = require("../utils/errorResponse");
const catchAsync = require("../middlewares/catchAsync");
const {} = require("../middlewares/validatePayload");
//const mongoose = require("mongoose");
const Product = require("../models/product");
//const sendEmail = require("../services/sendEmail");

exports.add = catchAsync(async (req, res) => {
  try {
    req.body = validateUserSignupBody(req.body);
    console.log(req.body);
    const product = await Product.create(req.body);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    errorResponse(res, error);
  }
});
