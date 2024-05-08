// const crypto = require('crypto');
// const Razorpay = require('razorpay')
// const router = require("express").Router();
// const dotenv = require("dotenv");
// const User = require('../modals/user')
// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port: 8080 });
// dotenv.config();


// router.post('/', async (req, res) => {
//     try {
//         // Extract the payment response data from the request body
//         const { status,orderDetails } = req.body;
//         // console.log(orderDetails,"order details")
//         //  console.log(orderDetails.payementId.current,"rajorpayment")
//         // Verify the signature to ensure the payment response is genuine
//         // You need to generate the HMAC using your key secret and the order ID and payment ID
//         console.log(status)
//         console.log(orderDetails,"orderdetails1")
//         const user = await User.find({email:orderDetails.loginuserid});

//            if (!user) {
//                return res.status(404).json({ error: 'User not found' });
//            }

//            // Update the user's razorpay_payment_id
//            user.razorpay_payment_id = orderDetails.paymentId.current;
//            await user.save();

//         const generatedSignature = crypto
//             .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//             .update(`${orderDetails.paymentId.current}|${orderDetails.paymentId.current}`)
//             .digest('hex');

//         // Compare the generated signature with the signature sent by Razorpay
//         if (generatedSignature !== orderDetails.signature) {
//             // If the signatures don't match, return an error response
//             return res.status(400).json({ error: 'Invalid signature' });
//         }

//         // If the signature is valid, you can update your database or perform other actions
//         // For example, if 'status' is 'captured', you can mark the payment as successful
//         if (status==='succeeded') {
//             // Perform actions such as updating payment status in your database
//             // Example: await Payment.updateOne({ _id: razorpay_order_id }, { status: 'success' });
//             // WebSocket server code
//             // Return a success response
//            // Find the user by their ID or any other unique identifier
//            console.log(orderDetails,"orderdetails")
//            const user = await User.findById(orderDetails.loginuserid);

//            if (!user) {
//                return res.status(404).json({ error: 'User not found' });
//            }

//            // Update the user's razorpay_payment_id
//            user.razorpay_payment_id = orderDetails.paymentId.current;
//            await user.save();

//             console.log(orderDetails.paymentId.current);
//             return res.status(200).json({ message: 'Payment successful' });
//         } else {
//             // Handle other payment statuses if necessary
//             return res.status(200).json({ message: 'Payment status: ' + status });
//         }

//     } catch (error) {
//         console.error('Error handling payment:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// });





// module.exports = router;

const crypto = require('crypto');
const Razorpay = require('razorpay');
const router = require('express').Router();
const dotenv = require('dotenv');
const User = require('../modals/user');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
dotenv.config();

router.post('/', async (req, res) => {
    try {
        // Extract the payment response data from the request body
        const { status, orderDetails } = req.body;

        console.log(status);
        console.log(orderDetails, 'orderdetails1');
         if(status==="succeeded"){
            const user = await User.findOne({ email: orderDetails.loginuserid });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
    
            // Update the user's razorpay_payment_id
            user.razorpay_payment_id = orderDetails.paymentId.current;
            await user.save();
         }
        // Find the user by email
       

        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${orderDetails.paymentId.current}|${orderDetails.paymentId.current}`)
            .digest('hex');

        // Compare the generated signature with the signature sent by Razorpay
        if (generatedSignature !== orderDetails.signature) {
            // If the signatures don't match, return an error response
            return res.status(400).json({ error: 'Invalid signature' });
        }

        // If the signature is valid, you can update your database or perform other actions
        // For example, if 'status' is 'succeeded', you can mark the payment as successful
        console.log("Status:", status); // Add this line for debugging
        if (status === 'succeeded') {
            // Update the user's razorpay_payment_id again (optional, already done above)
            const user = await User.findOne({ email: orderDetails.loginuserid });
            user.razorpay_payment_id = orderDetails.paymentId.current;
            await user.save();

            console.log(orderDetails,"inside succedded");
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