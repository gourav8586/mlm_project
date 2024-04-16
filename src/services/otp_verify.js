let user = require("../model/user");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.otp_verification = async (req, res) => {
  let token = req.cookies.jwt;
  console.log("token....--" + token);

  let otp = req.body.otp;

  let data = await user.findOne({
    auth_key: token,
  });

  if (data.otp == otp) {
    console.log("user login");
    return {
      data: data,
      message: "user login successfully",
      success: true,
      status: 200,
    };
  } else {
    return {
      data: [],
      message: "user login failed",
      success: false,
      status: 300,
    };
  }
};
