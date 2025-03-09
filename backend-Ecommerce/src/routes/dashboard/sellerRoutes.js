const sellerController = require("../../controllers/dashboard/seller.controller");
const { authMiddleware } = require("../../middlewares/auth.middleware");

const router = require("express").Router();

router.get("/get-seller-request", authMiddleware, sellerController.get_seller_request);
router.get("/get-seller/:sellerId", authMiddleware, sellerController.get_seller);
router.post("/update-seller-status", authMiddleware, sellerController.update_seller_status);
router.get("/get-active-seller", authMiddleware, sellerController.get_active_seller);
router.get("/get-deactivate-seller", authMiddleware, sellerController.get_deactivate_seller);

module.exports = router;
