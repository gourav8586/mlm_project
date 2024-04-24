const { addUsers2 } = require("../services/add_users2");

exports.addUsers_frm = async (req, res) => {
  res.render("addusers");
};

exports.adduser_page = async (req, res) => {
  let data = await addUsers2(req, res);
  if (data.success) {
    res.render("addusers");
  } else {
    res.status(data.status).send({
      message: data.message,
      status: data.status,
      success: data.success,
    });
  }
};
