let { register } = require("../services/register");

exports.register_frm = async (req, res) => {
  res.render("register");
};
exports.register_page = async (req, res) => {
  let regis = await register(req, res);
  if (regis.success) {
    res.render("adminlogin");
  } else {
    res.status(regis.status).send({
      message: regis.message,
      status: regis.status,
      success: regis.success,
      data: [],
    });
  }
};
