const express = require('express');
const router = express.Router();
const Payment = require('../modals/payment'); // Update the path to where your model is defined

// Route to check payment status
router.get('/', async (req, res) => {
    const { loginuserid } = req.body; 
  console.log(loginuserid,"login")
    if (!loginuserid) {
        return res.status(400).json({ message: "Email parameter is required." });
    }

    try {
        const payment = await Payment.findOne({ email: loginuserid });
        console.log(payment,"payment")
        if (!payment) {
            return res.status(404).json({ message: "Payment record not found." });
        }

        res.json({
            email: payment.email,
            paymentStatus: payment.paymentStatus,
            razorpayPaymentId: payment.razorpay_payment_id
        });
    } catch (error) {
        console.error('Failed to fetch payment status:', error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
