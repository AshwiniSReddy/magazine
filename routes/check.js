const express = require("express");
const router = express.Router();
const Payment = require('../modals/payment'); // Adjust the path as necessary
const http = require('http');
const io = require('socket.io')(http); // Pass the HTTP server to Socket.IO
const User=require('../modals/user')
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
          
        
        // Find the user by email and update the fields
        const user = await User.findOneAndUpdate(
            { email: email },
            { 
                $set: { 
                    isSubscribed: true, 
                    startDate: new Date(),
                    razorpay_payment_id: id
                } 
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('Webhook processed and data saved.');
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
