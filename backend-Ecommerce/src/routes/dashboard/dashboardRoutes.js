
const dashboardController = require("../../controllers/dashboard/dashboardController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/admin/get-dashboard-data", authMiddleware, dashboardController.get_admin_dashboard_data);
router.get("/seller/get-dashboard-data", authMiddleware, dashboardController.get_seller_dashboard_data);


module.exports = router;
