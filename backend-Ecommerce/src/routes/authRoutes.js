const authController = require("../controllers/authController");

const router = require("express").Router();

router.post("/admin-login", authController.admin_login);

module.exports = router;
