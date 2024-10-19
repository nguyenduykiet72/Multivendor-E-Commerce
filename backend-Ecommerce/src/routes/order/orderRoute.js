const orderController = require("../../controllers/order/orderControllers");
const router = require("express").Router();

//Customer routes
router.post("/home/order/place-order", orderController.place_order);
router.get(
  "/home/customer/get-dashboard-data/:userId",
  orderController.get_customer_dashboard_data
);
router.get(
  "/home/customer/get-orders/:customerId/:status",
  orderController.get_orders
);
router.get(
  "/home/customer/get-detail-order/:orderId",
  orderController.get_detail_order
);

//Admin routes
router.get("/admin/orders", orderController.get_admin_orders);
router.get(
  "/admin/order/detail/:orderId",
  orderController.get_admin_order_detail
);
router.put(
  "/admin/update/order-status/:orderId",
  orderController.update_admin_order_status
);

//Seller routes
router.get("/seller/orders/:sellerId", orderController.get_seller_orders);
router.get(
  "/seller/order/detail/:orderId",
  orderController.get_seller_order_detail
);
router.put(
  "/seller/update/order-status/:orderId",
  orderController.update_seller_order_status
);

module.exports = router;
