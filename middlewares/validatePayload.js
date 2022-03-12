const mongoose = require("mongoose");
const { Types } = mongoose;
const { ObjectId } = Types;
const { isEmail, phoneNumber } = require("../utils/validator");

exports.validateUserSignupBody = function (data) {
  data.role = "Client";
  data.isVerified = false;
  if (!data.addresses || data.addresses.length == 0)
    throw { message: "PLEASE PROVIDE AT LEAST ONE ADDRESS." };
  if (data.primaryAddress >= data.addresses.length) data.primaryAddress = 0;
  return data;
};

exports.validateUserLoginBody = function (data) {
  if (!data.ID || !data.password)
    throw { message: "ID Or PASSWORD IS MISSING." };
  if (isEmail(data.ID)) {
    data.email = data.ID;
  } else if (phoneNumber(data.ID)) {
    data.phoneNum1 = data.ID;
  } else throw { message: "ID IS INVALID." };
  data.ID = undefined;
  //data.isVerified = true;
  return data;
};

exports.validateAddProduct = function (data) {
  return data;
};

exports.validateAddCategory = function (data) {
  return data;
};

exports.validateAddSubCategory = function (data) {
  return data;
};
