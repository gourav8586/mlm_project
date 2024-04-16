let user = require("../model/user");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.Sign_Out = async (req, res) => {
  try {
    const token = req.cookies.jwt;

    console.log("TK", token);

    let data = await user.findOneAndUpdate(
      { auth_key: token },
      { auth_key: null }
    );

    console.log("Data", data);

    res.clearCookie("jwt");

    if (data) {
      return {
        message: "User logged out",
        success: true,
      };
    } else {
      return {
        message: "Error",
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
