


const router = require('express').Router();
const User = require('../modals/user');

// Define a route to fetch payment ID for a specific user
router.get('/:userId', async (req, res) => {
    try {
        console.log(req.params)
        const userId = req.params.userId;

        // Find the user by user ID
        const user =await User.findOne({ email:userId });;

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the payment ID
        return res.status(200).json({ paymentId: user.razorpay_payment_id });
    } catch (error) {
        console.error('Error fetching payment ID:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
