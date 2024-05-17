// subscriptionScheduler.js

const User = require('../modals/user');
const Payment=require('../modals/payment')

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
        for (const user of usersToUnsubscribe) {
            const userEmail = user.email;  // Assuming email is used to link users and payments

            // Delete associated payments
            await Payment.deleteMany({ email: userEmail });

            

            console.log(`Deleted user and associated payments for email: ${userEmail}`);
        }
    } catch (error) {
        console.error('Automatic unsubscription failed:', error);
    }
};


// Run the function periodically


module.exports=checkSubscriptionStatus;