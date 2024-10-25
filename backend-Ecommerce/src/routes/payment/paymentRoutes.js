const paymentController = require("../../controllers/payment/paymentControllers");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const router = require("express").Router();

router.get( "/payment/create-stripe-connect-account", authMiddleware, paymentController.create_stripe_connect_account);
router.put( "/payment/active-stripe-connect-account/:activeCode", authMiddleware, paymentController.active_stripe_connect_account);



module.exports = router;
