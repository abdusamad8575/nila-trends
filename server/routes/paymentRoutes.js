const express = require('express');
const { initiateNgeniusPayment, confirmNgeniusPayment } = require('../controllers/paymentController');
const router = express.Router();
const authorization = require("../middlewares/authorization");

router.post('/initiate', initiateNgeniusPayment);
router.post('/confirm',authorization, confirmNgeniusPayment);   

module.exports = router;
