const customerController = require("../../controllers/home/customerAuthControllers");
const router = require("express").Router();

router.post("/customer/customer-register", customerController.customer_register);
router.post("/customer/customer-login", customerController.customer_login);

module.exports = router;
