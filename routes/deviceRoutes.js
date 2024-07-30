const express = require("express");
const deviceController = require("./../controllers/deviceController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.use(authController.protectAPI);

router.route("/devices").get(deviceController.getAllBrandSmartphones);
router.route("/details").get(deviceController.getBrandSmartPhoneDetails);

module.exports = router;
