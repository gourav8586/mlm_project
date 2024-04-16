let express = require("express");
let router = express.Router();
let auth = require("../../auth/adminauth");
// const multer = require("multer");
const {
  edit_profile,
  update_user_profile,
} = require("../controllers/admin_profile_update");

router.get("/adminprofile", auth, edit_profile);
router.post("/update_profile", auth, update_user_profile);
module.exports = router;
