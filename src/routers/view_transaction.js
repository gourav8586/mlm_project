let auth = require("../../auth/adminauth");
let express = require("express");
const { View_transation_page } = require("../controllers/view_transaction");
let router = express.Router();

router.get("/viewtransaction", auth, View_transation_page);

module.exports = router;
