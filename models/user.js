const mongoose = require("mongoose");
const { phoneNumber } = require("../utils/validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNum1: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNum2: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      unique: true,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    isVerified: {
      type: Boolean,
      default: false,
    },
    addresses: [
      {
        country: { type: String, default: "IN" },
        state: { type: String, required: true },
        city: { type: String, required: true },
        pincode: {
          type: String,
          required: true,
        },
        streetAddress: {
          type: String,
          required: true,
        },
        landMark: {
          type: String,
          default: null,
        },
      },
    ],
    primaryAddress: { type: Number, default: 0 },
    memberType: {
      subscriptionMode: {
        type: String,
        default: "Temporary",
        enum: ["Temporary", "Week", "Month"],
      },
      activeTill: {
        type: Date,
        default: null,
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 12);
});
userSchema.methods.getJWTToken = function () {
  return jwt.sign(
    { _id: this._id, role: this.role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    }
  );
};

//Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

userSchema.path("phoneNum1").validate(function (phoneNum1) {
  return phoneNumber(phoneNum1);
}, "PHONE MUST BE A 10 DIGIT NUMBER.");

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
