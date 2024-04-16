const { viewProduct_frm } = require("../controllers/view_product");
let auth = require("../../auth/adminauth");
let express = require("express");
let router = express.Router();
router.get("/view_product", auth, viewProduct_frm);

module.exports = router;
