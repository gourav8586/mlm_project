let express = require("express");
let router = express.Router();
let auth = require("../../auth/adminauth");
const {
  update_details,
  update_user,
} = require("../controllers/update");

router.get("/update", auth, update_details);
router.post("/update_details",auth, update_user )

module.exports = router;
