const sellerController = require("../../controllers/dashboard/sellerControllers");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/get-seller-request", authMiddleware, sellerController.get_seller_request);
router.get("/get-seller/:sellerId", authMiddleware, sellerController.get_seller);
router.post("/update-seller-status", authMiddleware, sellerController.update_seller_status);

module.exports = router;
