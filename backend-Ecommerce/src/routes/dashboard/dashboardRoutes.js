
const dashboardController = require("../../controllers/dashboard/dashboardController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/admin/get-dashboard-data", authMiddleware, dashboardController.get_admin_dashboard_data);
router.get("/seller/get-dashboard-data", authMiddleware, dashboardController.get_seller_dashboard_data);
router.post("/banner/add", authMiddleware, dashboardController.add_banner);
router.get("/banner/get/:productId", authMiddleware, dashboardController.get_banner);
router.put("/banner/update/:bannerId", authMiddleware, dashboardController.update_banner);
router.get("/banners", dashboardController.get_banners);


module.exports = router;
