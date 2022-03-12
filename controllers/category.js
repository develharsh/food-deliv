const errorResponse = require("../utils/errorResponse");
const catchAsync = require("../middlewares/catchAsync");
const { validateAddCategory } = require("../middlewares/validatePayload");
//const mongoose = require("mongoose");
const Category = require("../models/category");
//const sendEmail = require("../services/sendEmail");

exports.add = catchAsync(async (req, res) => {
  try {
    req.body = validateAddCategory(req.body);
    console.log(req.body);
    const category = await Category.create(req.body);
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    errorResponse(res, error);
  }
});
