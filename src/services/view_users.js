let user = require("../model/user");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.view = async (req, rep) => {
  let email = req.query.email;

  let token = req.cookies.jwt;
  let user2 = await user.findOne({ auth_key: token });

  if (user2.addedBy == 0) {
    let data = await user.find();

    console.log("User", data);
    if (data) {
      return {
        data: data,
        message: "All Users",
      };
    }
  } else  {
    let data = await user.find({ addedBy: user2.userId });

    console.log("User", data);
    if (data) {
      return {
        data: data,
        message: "All Users",
      };
    }
  }
};
