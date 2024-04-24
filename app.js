const express = require("express");
const session = require("express-session");
const passport = require("passport");
const authRoute = require("./routes/auth");
const rajorpay=require('razorpay')
const crypto = require("crypto");
const app = express();

const cors= require("cors")
const sessionSecret = crypto.randomBytes(64).toString("hex");
// Session middleware configuration
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
 

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`The server is up at ${PORT}`);
});
