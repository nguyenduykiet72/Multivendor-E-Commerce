const chatController = require("../controllers/chat/chatControllers");
const router = require("express").Router();
const { authMiddleware } = require("../middlewares/authMiddleware");


router.get("/chat/admin/get-sellers",authMiddleware, chatController.get_sellers);

router.post("/chat/customer/add-customer-seller", chatController.add_customer_seller);

router.post("/chat/customer/send-message-to-seller", chatController.send_message_to_seller);

router.get("/chat/seller/get-customers/:sellerId", chatController.get_customers);

router.get("/chat/seller/get-customer-message/:customerId", authMiddleware, chatController.get_customer_seller_message);

router.post("/chat/seller/send-message-to-customer", authMiddleware, chatController.seller_send_msg_customer);

//message to seller from admin
router.post("/chat/message-send-seller-admin", authMiddleware, chatController.seller_admin_message);

router.get("/chat/get-admin-messages/:receiverId", authMiddleware, chatController.get_admin_messages);

router.get("/chat/get-seller-messages", authMiddleware, chatController.get_seller_messages);

module.exports = router;
