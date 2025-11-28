const express = require('express');
const router = express.Router();


const { adminLogin } = require('../controllers/adminController');
const { sendOtp, verifyOtp } = require('../controllers/otpController');


router.post('/login', adminLogin);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);


module.exports = router;