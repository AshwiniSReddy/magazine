const express = require("express");
const session = require("express-session");
const passport = require("passport");
const authRoute = require("./routes/auth");
const rajorpay=require('razorpay')
const order=require('./routes/order')
const payment=require('./routes/payment')
const crypto = require("crypto");
const bodyParser = require('body-parser');
const app = express();
const magazine_subscribe=require('./routes/subsribe')
const connectDB=require('./ConnectDb/connect')
const check_subscription=require('./routes/checksubscription')
const cors= require("cors")
const sessionSecret = crypto.randomBytes(64).toString("hex");
const subscriptionScheduler = require('./routes/subscriptionScheduler');
const refund=require('./routes/refund')
const check=require('./routes/check')
const check_payment_status=require('./routes/checkpaymentstatus')
// Session middleware configuration

app.use(bodyParser.json());
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'  // Use secure cookies in production
      }
}));

// Configure CORS
app.use(cors({
    origin: 'http://localhost:3000', // Make sure to match this with the actual URL of your frontend
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));


// Initialize Passport and session management
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoute);
app.use('/api/order',order);
app.use('/api/payment',payment)
app.use('/api/magazine_subscribe',magazine_subscribe)
app.use('/api/check_subscription',check_subscription)
app.use('/api/refund',refund)
app.use('/api/updatepaymentstatus',check)
app.use('/api/check_payment_status',check_payment_status)

setInterval(subscriptionScheduler,  60 * 1000); // Check once every 24 hours
// Start server
const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT, async () => {
    await connectDB();
    console.log(`Ther server is up at ${process.env.PORT}`)
  })