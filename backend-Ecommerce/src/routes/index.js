const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const categoryRoutes = require("./dashboard/categoryRoutes");
const productRoutes = require("./dashboard/productRoutes");
const sellerRoutes = require("./dashboard/sellerRoutes");
const homeRoutes = require("./home/homeRoutes");
const customerRoutes = require("./home/customerAuthRoutes");
const cartRoutes = require("./home/cartRoutes");
const orderRoutes = require("./order/orderRoute");
const chatRoutes = require("./chatRoutes");
const paymentRoutes = require("./payment/paymentRoutes");
const dashboardRoutes = require("./dashboard/dashboardRoutes");

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