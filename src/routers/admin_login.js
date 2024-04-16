let {
  login_page,
  login_frm,
  dashboard,
} = require("../controllers/admin_login");
let express = require("express");
let router = express.Router();

router.get("/", login_frm);
router.post("/loginpage", login_page);

router.get("/user_dashboard", dashboard);

module.exports = router;
