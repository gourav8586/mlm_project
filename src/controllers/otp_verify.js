let { otp_verification } = require("../services/otp_verify");

exports.gmail_otp = async (req, res) => {
  res.render("nodemailer");
};
exports.opt_verify = async (req, res) => {
  let data = await otp_verification(req, res);
  if (data.success) {
    res.render("dashboard", { data: data.data, message: [data.data.name] });
  } else {
    res.status(data.status).send({
      message: data.message,
      status: data.status,
      success: data.success,
    });
  }
};
