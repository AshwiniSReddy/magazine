const crypto = require('crypto');
const Razorpay = require('razorpay')
const router = require("express").Router();
const dotenv = require("dotenv");
dotenv.config();


router.post('/', async (req, res) => {
    try {
        // Extract the payment response data from the request body
        const { razorpay_signature, razorpay_order_id, razorpay_payment_id, status } = req.body;

        // Verify the signature to ensure the payment response is genuine
        // You need to generate the HMAC using your key secret and the order ID and payment ID
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        // Compare the generated signature with the signature sent by Razorpay
        if (generatedSignature !== razorpay_signature) {
            // If the signatures don't match, return an error response
            return res.status(400).json({ error: 'Invalid signature' });
        }

        // If the signature is valid, you can update your database or perform other actions
        // For example, if 'status' is 'captured', you can mark the payment as successful
        if (status === 'captured') {
            // Perform actions such as updating payment status in your database
            // Example: await Payment.updateOne({ _id: razorpay_order_id }, { status: 'success' });

            // Return a success response
            return res.status(200).json({ message: 'Payment successful' });
        } else {
            // Handle other payment statuses if necessary
            return res.status(200).json({ message: 'Payment status: ' + status });
        }
    } catch (error) {
        console.error('Error handling payment:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;