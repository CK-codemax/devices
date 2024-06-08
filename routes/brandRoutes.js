const express = require('express');
const brandController = require('./../controllers/brandController');


const router = express.Router();

// router
// .route('/')
// .get(brandController.getApple);

router
.route('/')
.get(brandController.getAllBrands);

router
.route('/phones')
.get(brandController.pushDevicesToDB);

router
.route('/:brandId')
.get(brandController.getBrandSmartphones);

router.
route('/details/:brandId')
.get(brandController.getDeviceListDetails);


module.exports = router;
