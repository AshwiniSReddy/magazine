const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    magazineSubscription: { type: Boolean, default: false }, // Default value is false
    // Other fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
