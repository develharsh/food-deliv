const errorResponse = require("../utils/errorResponse");
const catchAsync = require("../middlewares/catchAsync");
const { validateAddSubCategory } = require("../middlewares/validatePayload");
//const mongoose = require("mongoose");
const Subcategory = require("../models/subcategory");
//const sendEmail = require("../services/sendEmail");

exports.add = catchAsync(async (req, res) => {
  try {
    req.body = validateAddSubCategory(req.body);
    console.log(req.body);
    const subcategory = await Subcategory.create(req.body);
    res.status(200).json({ success: true, data: subcategory });
  } catch (error) {
    errorResponse(res, error);
  }
});
