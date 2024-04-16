let express = require("express");
let router = express.Router();
let auth = require("../../auth/adminauth");
const {
  withdrawal_money_frm,
  withdrawal_money_page,
} = require("../controllers/withdrawal");

router.get("/withdrawalmoney", auth, withdrawal_money_frm);
router.post("/withdrawal_money", auth, withdrawal_money_page);

module.exports = router;
