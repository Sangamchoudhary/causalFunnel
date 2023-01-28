const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");

// Schema
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    }
  },
  password: { type: String, required: true, minLength: 6 },
  confirmPassword: {
    type: String,
    minLength: 6,
    validate: [function () {
      return this.password == this.confirmPassword;
    },"password and confirm password must be same"],
  },
});

userSchema.pre("save", async function () {
  // it will run before saving
  this.confirmPassword = undefined;
  let salt = await bcrypt.genSalt();
  let hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

userSchema.methods.resetPasswordHandler = function (password, confirmPassword) {
  this.password = password;
  this.confirmPassword = confirmPassword;
};

module.exports = mongoose.model("userModel", userSchema);
