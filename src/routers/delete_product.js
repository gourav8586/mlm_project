let express = require("express");
let router = express.Router();

let auth = require("../../auth/adminauth");
const { delete_product } = require("../controllers/delete_product");

router.post("/delete_product", auth, delete_product);
module.exports = router;
