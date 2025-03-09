const customerController = require("../../controllers/home/customer.auth.controller");
const router = require("express").Router();

router.post("/customer/customer-register", customerController.customer_register);
router.post("/customer/customer-login", customerController.customer_login);
router.get("/customer/logout", customerController.customer_logout);

module.exports = router;
