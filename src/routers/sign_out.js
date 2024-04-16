let express = require("express");
let router = express.Router();
let auth = require("../../auth/adminauth");
const { sign_out_user } = require("../controllers/sign_out");

router.get("/signout", auth, sign_out_user);

module.exports = router;
