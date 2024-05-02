const router = require("express").Router();
const User = require('../modals/user');

router.post('/', async (req, res) => {
    try {
        const { loginuserid } = req.body;
        // Find the user by their ID
        
        const user = await User.findOne({email:loginuserid});
        console.log(user.email)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if the user is subscribed to the magazine
        const isSubscribed = user.magazineSubscription;
        res.status(200).json({ isSubscribed });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
