const { Sign_Out } = require("../services/sign_out");

exports.sign_out_user = async (req, res) => {
  let data = await Sign_Out(req, res);
  if (data.success) {
    res.render("adminlogin");
  } else {
    res.render("dashboard");
    console.log("Errorrr");
  }
};
