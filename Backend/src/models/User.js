const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
googleId: { type: String, index: true, unique: true },
email: { type: String, required: true },
name: String,
avatar: String,
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('User', UserSchema);