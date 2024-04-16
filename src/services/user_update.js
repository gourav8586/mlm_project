let user = require("../model/user");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.Update_user_details = async (req, res) => {
  let email = req.query.email;
  let token = req.cookies.jwt;
  console.log(email);
  let data1 = await user.findOne({ auth_key: token });
  let data = await user.findOne({ email: email });

  if (data1.role == "Admin") {
    if (data) {
      return {
        data: data,
        success: true,
        message: "user find....",
      };
    } else {
      return {
        success: false,
        message: "no user and You are not a Admin",
      };
    }
  }
};

exports.Update_user = async (req, res) => {
  let name = req.body.name;
  let mobile = req.body.mobile;
  let email = req.body.email;
  let pass = req.body.pass;
  let dateOfBirth = req.body.dateOfBirth;
  let address = req.body.address;
  let state = req.body.state;
  let gender = req.body.gender;
  let city = req.body.city;

  if (pass) {
    let password = bcrypt.hashSync(pass, 10);

    let data = await user.findOneAndUpdate(
      { email: email },
      {
        name: name,
        mobile: mobile,
        pass: password,
        dateOfBirth: dateOfBirth,
        address: address,
        state: state,
        gender: gender,
        city: city,
      }
    );

    if (data) {
      return {
        data: data,
        success: true,
        message: "User Details Updated",
        status: 200,
      };
    } else {
      return {
        data: [],
        success: false,
        status: 300,
        message: "User can't update",
      };
    }
  } else {
    let data = await user.findOneAndUpdate(
      { email: email },
      {
        name: name,
        mobile: mobile,
        dateOfBirth: dateOfBirth,
        address: address,
        state: state,
        gender: gender,
        city: city,
      }
    );

    if (data) {
      return {
        data: data,
        success: true,
        message: "User Details Updated",
        status: 200,
      };
    } else {
      return {
        data: [],
        success: false,
        status: 300,
        message: "User can't update",
      };
    }
  }
};
