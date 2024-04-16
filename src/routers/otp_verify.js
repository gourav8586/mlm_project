let { opt_verify } = require("../controllers/otp_verify");
let express = require("express");
let router = express.Router();

let auth = require("../../auth/adminauth");

router.post("/verify", auth, opt_verify);
module.exports = router;
