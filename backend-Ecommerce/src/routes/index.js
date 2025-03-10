const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.route");
const categoryRoutes = require("./dashboard/category.route");
const productRoutes = require("./dashboard/product.route");
const sellerRoutes = require("./dashboard/seller.route");
const homeRoutes = require("./home/home.route");
const customerRoutes = require("./home/customer.auth.route");
const cartRoutes = require("./home/cart.route");
const orderRoutes = require("./order/order.route");
const chatRoutes = require("./chat.route");
const paymentRoutes = require("./payment/payment.route");
const dashboardRoutes = require("./dashboard/dashboard.route");

router.use("/api", authRoutes);
router.use("/api", categoryRoutes);
router.use("/api", productRoutes);
router.use("/api", sellerRoutes);
router.use("/api", homeRoutes);
router.use("/api", customerRoutes);
router.use("/api", cartRoutes);
router.use("/api", orderRoutes);
router.use("/api", chatRoutes);
router.use("/api", paymentRoutes);
router.use("/api", dashboardRoutes);

module.exports = router;