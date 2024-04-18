let express = require("express");
let router = express.Router();
let auth = require("../../auth/adminauth");
const multer = require("multer");
const {
  edit_profile,
  update_user_profile,
} = require("../controllers/admin_profile_update");

let upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../mlm_project/public/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    },
  }),
});

router.get("/adminprofile", auth, edit_profile);
router.post(
  "/update_profile",
  auth,
  upload.single("image"),
  update_user_profile
);
module.exports = router;
