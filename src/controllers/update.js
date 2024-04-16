const { Update_user_details, Update_user } = require("../services/user_update");

exports.update_details = async (req, res) => {
  let data = await Update_user_details(req, res);
  if (data.success) {
    res.render("update", { data: data.data });
  } else {
    console.log(data.message);
  }
};

exports.update_user = async (req, res) => {
  let data = await Update_user(req, res);
  if (data.success) {
    res.render("dashboard", { message:""});
  } else {
    console.log(data.message);
  }
};