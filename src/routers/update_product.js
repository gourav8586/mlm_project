let express = require("express");
let router = express.Router();
let auth = require("../../auth/adminauth");
const {
  view_product_details,
  update_product_details,
} = require("../controllers/update_product");

router.get("/updateproduct", auth, view_product_details);
router.post("/update_product", auth, update_product_details);

module.exports = router;
