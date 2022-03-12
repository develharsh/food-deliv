const errorResponse = require("../utils/errorResponse");
const catchAsync = require("../middlewares/catchAsync");
const {
  validateUserSignupBody,
  validateUserLoginBody,
} = require("../middlewares/validatePayload");
//const mongoose = require("mongoose");
const User = require("../models/user");
const sendEmail = require("../services/sendEmail");

exports.signup = catchAsync(async (req, res) => {
  try {
    req.body = validateUserSignupBody(req.body);
    console.log(req.body);
    const user = await User.create(req.body);
    if (user.email) sendEmail("signup", { email: user.email, name: user.name });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    errorResponse(res, error);
  }
});

exports.verifyOtp = catchAsync(async (req, res) => {
  try {
    res.status(200).json({ success: true, data: 1 });
  } catch (error) {
    errorResponse(res, error);
  }
});

exports.login = catchAsync(async (req, res) => {
  try {
    console.log(req.body);
    req.body = validateUserLoginBody(req.body);
    const password = req.body.password;
    req.body.password = undefined;
    req.body = JSON.parse(JSON.stringify(req.body));
    console.log(req.body);
    const user = await User.findOne(req.body);
    if (!user) throw { message: "PLEASE REGISTER FIRST." };
    const passwordMatched = await user.comparePassword(password);
    console.log(passwordMatched);
    if (!passwordMatched) throw { message: "WRONG PASSWORD." };
    const token = user.getJWTToken();
    console.log(token);
    res
      .status(200)
      .json({ success: true, token, message: "SUCCESSFULLY LOGGED IN." });
  } catch (error) {
    errorResponse(res, error);
  }
});
