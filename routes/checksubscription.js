// const router = require("express").Router();
// const User = require('../modals/user');

// router.post('/', async (req, res) => {
//     try {
//         const { loginuserid } = req.body;
//         // Find the user by their email
//         const user = await User.findOne({ email: loginuserid });
        
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
        
//         // Check if the user is subscribed to the magazine
//         const isSubscribed = user.isSubscribed;
        
//         // Check if the subscription is valid
//         if (isSubscribed && user.startDate) {
//             const currentDate = new Date();
//             const subscriptionEndDate = new Date(user.startDate);
//             subscriptionEndDate.setMinutes(subscriptionEndDate.getMinutes() + 2); // Add 2 minutes
            
//             if (currentDate > subscriptionEndDate) {
//                 // Subscription period has expired
//                 user.isSubscribed = false;
//                 await user.save(); // Save the updated user document
//                 return res.status(200).json({ isSubscribed: false, message: "Subscription period has expired" });
//             }
//         }

//         // Return the subscription status
//         if (isSubscribed) {
//             res.status(200).json({ isSubscribed: true });
//         } else {
//             res.status(200).json({ isSubscribed: false, message: "Please subscribe" });
//         }
        
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// module.exports = router;
const router = require("express").Router();
const User = require('../modals/user');

router.post('/', async (req, res) => {
    try {
        const { loginuserid } = req.body;
        // Find the user by their email
        const user = await User.findOne({ email: loginuserid });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Check if the user is subscribed to the magazine
        const isSubscribed = user.isSubscribed;
        
        // Check if the subscription is valid
        if (isSubscribed && user.startDate) {
            const currentDate = new Date();
            const subscriptionEndDate = new Date(user.startDate);
            subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 1); // Add one day
            
            if (currentDate > subscriptionEndDate) {
                // Subscription period has expired
                user.isSubscribed = false;
                await user.save(); // Save the updated user document
                return res.status(200).json({ isSubscribed: false, message: "Subscription period has expired" });
            }
        }

        // Return the subscription status
        if (isSubscribed) {
            res.status(200).json({ isSubscribed: true });
        } else {
            res.status(200).json({ isSubscribed: false, message: "Please subscribe" });
        }
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
