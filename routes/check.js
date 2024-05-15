const express = require("express");
const router = express.Router();
const Payment = require('../modals/payment'); // Adjust the path as necessary

router.post('/', async (req, res) => {
    try {
        console.log("Webhook received");
        const { id, email } = req.body.payload.payment.entity; // Extract payment ID and email from the webhook payload

        // Create a new payment record using your existing schema
        const newPayment = new Payment({
            razorpay_payment_id: id,
            email: email,
            paymentStatus: 'captured' // Assuming the payment is captured since it's from the webhook
        });

        // Save the new payment record to the database
        await newPayment.save();
        res.status(200).send('Webhook processed and data saved.');
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
