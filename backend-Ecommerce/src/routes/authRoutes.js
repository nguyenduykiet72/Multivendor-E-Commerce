const authController = require("../controllers/authControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/admin-login", authController.admin_login);
router.get("/get-user", authMiddleware, authController.getUser);
router.post("/seller-register", authController.seller_register);
router.post("/seller-login", authController.seller_login);
router.post(
  "/upload-profile-image",
  authMiddleware,
  authController.upload_profile_image
);
router.post(
  "/add-profile-info",  
  authMiddleware,
  authController.add_profile_info
);

module.exports = router;
