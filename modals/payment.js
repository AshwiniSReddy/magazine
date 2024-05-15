const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
   
    email: String,
    paymentStatus: { type: String, default: "initiated" },
    razorpay_payment_id:{type:String,default:null}
    // Other fields as needed
});

const payment = mongoose.model('PaymentTable', paymentSchema);

module.exports = payment;
