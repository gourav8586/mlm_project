let user = require("../model/user");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.edit_profile_view = async (req, res) => {
  let token = req.cookies.jwt;
  let data = await user.findOne({ auth_key: token });

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
};

exports.Update_user = async (req, res) => {
  let name = req.body.name;
  let mobile = req.body.mobile;
  let dateOfBirth = req.body.dateOfBirth;
  let address = req.body.address;
  let state = req.body.state;
  let gender = req.body.gender;
  let city = req.body.city;
  let token = req.cookies.jwt;

  let update_data = await user.findOneAndUpdate(
    { auth_key: token },
    {
      name: name,
      mobile: mobile,
      dateOfBirth: dateOfBirth,
      address: address,
      state: state,
      gender: gender,
      city: city,
      image: req.file.filename,
    }
  );
 
  console.log("User", update_data);

  if (update_data) {
    return {
      data: update_data,
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
};
