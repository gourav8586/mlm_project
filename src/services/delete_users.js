let user = require("../model/user");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.del = async (req, res) => {
  let email = req.body.email;
  let token = req.cookies.jwt;
  console.log(email);

  if (email) {
    let data = await user.deleteOne({ email: email });
    console.log("data deleted");
    let data1 = await user.findOne({ userId: 1 });
    let update_all_childs = data1.allchild - 1;
    let data2 = await user.findOneAndUpdate(
      { auth_key: token },
      { allchild: update_all_childs }
    );

    return {
      data: data,
      success: true,
      status: 200,
    };
  } else {
    return {
      data: [],
      success: false,
      status: 400,
    };
  }
};
