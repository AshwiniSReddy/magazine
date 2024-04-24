const express = require("express");
const session = require("express-session");
const passport = require("passport");
const authRoute = require("./routes/auth");
const rajorpay=require('razorpay')
const crypto = require("crypto");
const app = express();
const sessionSecret = crypto.randomBytes(64).toString("hex");
// Session middleware configuration
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false
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
