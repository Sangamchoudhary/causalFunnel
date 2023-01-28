const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_key = "7f89sa7f89";

module.exports.isAuthorized = function isAuthorized(roles) {
  return function (req, res, next) {
    if (roles.includes(req.role)) next();
    else
      res.status(401).json({
        message: "Not authorized for getting info",
      });
  };
};

module.exports.protectRoute = async function protectRoute(req, res, next) {
  if (req.cookies.login) {
    let token = req.cookies.login;
    if (!token) {
      const client = req.get("User-Agent");
      if (client.includes("Chrome")) return res.redirect("/login");
      return res.json({ message: "No token Availaible" });
    }
    let payload = jwt.verify(token, jwt_key);
    if (!payload) return res.json({ message: "Wrong token Availaible" });
    const user = await userModel.findById(payload.payload);
    req.role = user.role;
    req.id = user.id;
    next();
  } else res.json({ message: "Please Login" });
};

module.exports.signup = async function signup(req, res) {
  try {
    let user = req.body;
    let createdUser = await userModel.create(user);
    res.json({
      message: "User Created",
      users: createdUser,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports.login = async function login(req, res) {
  try {
    let data = req.body;
    let user = await userModel.findOne({ email: data.email });
    if (!user) return res.json({ success: false, message: "user not found" });
    const isPassowrdMatch = await bcrypt.compare(data.password, user.password);
    if (!isPassowrdMatch) {
      return res.json({ success: false, message: "wrong credentials" });
    } else {
      let uid = user["_id"];
      let token = jwt.sign({ payload: uid }, jwt_key);
      res.cookie("login", token, { httpOnly: true });
      res.json({
        success: true,
        message: "User is logged in",
      });
    }
  } catch (err) {
    return res.status(500).json({
      Error: err.message,
    });
  }
};

module.exports.resetPassword = async function resetPassword(req, res) {
  const token = req.params.token;
  let { newPassword, confirmNewPassword } = req.body;
  if (newPassword != confirmNewPassword)
    return res.json({
      success: false,
      message: "new confirm password is not matched with new password",
    });
  const user = await userModel.findOne({ resetToken: token });
  if (!user) res.json({ message: "user not found with this email" });
  user.resetPasswordHandler(newPassword, confirmNewPassword);
  await user.save();
  res.json({ message: "Password reset successfully" });
};

module.exports.logout = function logout(req, res) {
  res.cookie("login", "", { maxAge: 1 }); // set to empty then destroy after 1ms
  res.json({ message: "user logged out successfully" });
};
