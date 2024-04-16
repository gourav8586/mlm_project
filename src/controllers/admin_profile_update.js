const { edit_profile_view, Update_user } = require("../services/admin_profile_update");

exports.edit_profile = async (req, res) => {
    let data = await edit_profile_view(req, res);
    if (data.success) {
      res.render("adminprofile", { data: data.data });
    } else {
      console.log(data.message);
    }
  };

  exports.update_user_profile = async (req, res) => {
    let data = await Update_user(req, res);
    if (data.success) {
      res.render("adminprofile", { data: data.data });
    } else {
      console.log(data.message);
    }
  };