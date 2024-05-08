const crypto = require('crypto');
const Razorpay = require('razorpay');
const router = require("express").Router();
const dotenv = require("dotenv");
const User = require('../modals/user')

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,
  });

// Endpoint for initiating refunds
router.post('/', async (req, res) => {
    try {
      const { paymentId, amount } = req.body;
         console.log(paymentId,"payment id")
      // Create a refund using Razorpay API
      const refund = await razorpay.payments.refund(paymentId, {
        amount: amount, // Specify the refund amount (in paise)
        speed: 'normal' // Specify the speed of refund (optional)
      });
  
      console.log('Refund initiated:', refund);
      res.status(200).json(refund);
    } catch (error) {
      console.error('Error initiating refund:', error);
      res.status(500).send('Error initiating refund');
    }
  });

  module.exports=router;

  