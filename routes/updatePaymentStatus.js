const express = require('express');
const router = express.Router();
const axios = require('axios'); // Import Axios for making HTTP requests
const Payment = require('../modals/payment');
const User = require('../modals/user');
const dotenv = require("dotenv");
dotenv.config();
// Define the route for updating payment status
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const { razorpay_payment_id, email } = req.body;

        // Fetch payment details from Razorpay API
        try {
            const response = await axios.get(`https://api.razorpay.com/v1/payments/${razorpay_payment_id}`, {
                auth: {
                    username: process.env.RAZORPAY_KEY_ID,
                    password: process.env.RAZORPAY_KEY_SECRET
                }
            });
            const paymentData = response.data;
            const paymentStatus = paymentData.status;

            // Update payment status in the Payment model
            await Payment.findOneAndUpdate(
                { razorpay_payment_id: razorpay_payment_id, email },
                { paymentStatus }, // Update payment status received from Razorpay
                { new: true }
            );

            // Update payment ID in the User model
            await User.findOneAndUpdate(
                { email },
                { razorpay_payment_id: razorpay_payment_id },
                { new: true }
            );

            // Send a success response
            res.status(200).json({ message: 'Payment status updated successfully', paymentStatus });

            console.log(response, "response");
        } catch (error) {
            console.error('Error fetching payment details from Razorpay API:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } catch (error) {
        console.error('Error updating payment status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
