const router = require("express").Router();
const passport = require("passport");
const dotenv = require("dotenv");
const User = require('../modals/user')

dotenv.config();

router.post('/', async (req, res) => {
    try {
        const { loginuserid } = req.body;
        // Find the user by their ID
        console.log(loginuserid)
        const user = await User.findOneAndUpdate(
            { email: loginuserid },
            { $set: { isSubscribed: true, startDate: new Date() } },
            { new: true }
        );
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Update the magazineSubscription field to true
        user.isSubscribed = true;
        user.startDate = new Date();
        await user.save();
        res.status(200).json({ message: 'Magazine subscription updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;