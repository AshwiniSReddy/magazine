const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
   
        isSubscribed: { type: Boolean, default: false },
        startDate: { type: Date, default: null },
        razorpay_payment_id:{type:String,default:null}
    // Other fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
