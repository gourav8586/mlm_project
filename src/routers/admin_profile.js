let express = require("express");
const { user_profile } = require("../controllers/admin_profile");
let router = express.Router();
let auth = require("../../auth/adminauth");

router.get("/adminprofile", auth, user_profile);
module.exports = router;
