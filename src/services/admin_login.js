let user = require("../model/user");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.adminlogin = async (req, res) => {
  try {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.pass;
    let data = await user.findOne({ email: email });

    if (!data) {
      return {
        message: "Email not found",
        success: false,
        status: 300,
        data: [],
      };
    } else {
      let check = bcrypt.compareSync(password, data.pass);
      if (check) {
        if (data.user_auth == "Blocked") {
          return {
            message: "User is blocked. Please contact support for assistance.",
            success: false,
            status: 300,
            data: [],
          };
        } else {
          console.log("User Logged in");
          console.log("ID is" + data._id);

          const token = jwt.sign({ _id: data._id.toString() }, "aabbcc");
          await user.findByIdAndUpdate({ _id: data._id }, { auth_key: token });
          res.cookie("jwt", token, {
            expries: new Date(Date.now() + 10000 * 60 * 60), //1 min
            httpOnly: true,
            overwrite: true,
          });

          // function generateOTP() {
          //   const digits = "0123456789";
          //   let OTP = "";
          //   for (let i = 0; i < 6; i++) {
          //     OTP += digits[Math.floor(Math.random() * 10)];
          //   }
          //   return OTP;
          // }

          // const otp = generateOTP();
          // let userData = await user.findOneAndUpdate(
          //   { auth_key: token },
          //   { otp: otp }
          // );

          // const transporter = nodemailer.createTransport({
          //   service: "gmail",
          //   auth: {
          //     user: "happyg8586@gmail.com",
          //     pass: "udcm enot ueeu cbwv",
          //   },
          // });

          // const mailOptions = {
          //   from: "happyg8586@gmail.com",
          //   to: userData.email,
          //   subject: "Your OTP for Gmail Verification",
          //   text: `Your OTP is: ${otp}`,
          // };

          // const data1 = await transporter.sendMail(mailOptions);

          return {
            message: "Login successful.",
            email: data.email,
            data: data,
            success: true,
            status: 200,
          };
        }
      } else if (!check) {
        return {
          message: "Password doesn't match",
          success: false,
          status: 300,
          data: [],
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
};
