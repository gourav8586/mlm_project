let user = require("../model/user");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.register = async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.pass;
  let mobileNo = req.body.mobile;
  let dateOfBirth = req.body.dateOfBirth;
  let gender = req.body.gender;
  let address = req.body.address;
  let state = req.body.state;
  let city = req.body.city;
  let wallet = req.body.wallet;
  console.log("wallet ka amount-- " + req.body.wallet);
  let mychild = 0;

  let bpass = bcrypt.hashSync(password, 10);

  let data = await user.findOne({ email });

  if (!data) {
    let rec = new user({
      name: name,
      mobile: mobileNo,
      email: email,
      pass: bpass,
      dateOfBirth: dateOfBirth,
      gender: gender,
      address: address,
      state: state,
      wallet: wallet,
      city: city,
      mychild: 0,
    });

    let saved_data = await rec.save();

    if (saved_data) {
      return {
        message: "data saved",
        data: saved_data,
        success: true,
        status: 200,
      };
    } else {
      return {
        message: "not saved",
        data: [],
        success: false,
        status: 300,
      };
    }
  } else {
    console.log("User Found");
    return {
      success: false,
      message: "User already found",
    };
  }
};
