// subscriptionScheduler.js

const User = require('../modals/user');

const checkSubscriptionStatus = async () => {
    try {
        const twoMinutesAgo = new Date();
        twoMinutesAgo.setMinutes(twoMinutesAgo.getMinutes() - 2); // Subtract 2 minutes from the current time
        const usersToUnsubscribe = await User.find({
            isSubscribed: true,
            startDate: { $lt: twoMinutesAgo }
        });
        usersToUnsubscribe.forEach(async (user) => {
            user.isSubscribed = false;
            await user.save();
        });
    } catch (error) {
        console.error('Automatic unsubscription failed:', error);
    }
};


// Run the function periodically


module.exports=checkSubscriptionStatus;