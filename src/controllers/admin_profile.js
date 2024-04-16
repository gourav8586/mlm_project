const { user_profile } = require("../services/admin_profile");

// exports.user_profile=async (req,res)=>{
//     res.render("adminprofile")
// }

exports.user_profile = async (req, res) => {
  let data = await user_profile(req, res);
  if (data.success) {
    res.render("adminprofile", { data: data.data });
  }else{
    console.log(data.message);
  }
};
