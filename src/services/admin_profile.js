let user = require("../model/user");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.user_profile = async (req, res) => {
  let token = req.cookies.jwt;

  let data = await user.findOne({ auth_key: token });
  if (data) {
    return {
      data: data,
      message: "User Profile View",
      success: true,
      status: 200,
    };
  } else {
    return {
      data: [],
      message: "Can't view user profile",
      success: true,
      status: 200,
    };
  }
};
