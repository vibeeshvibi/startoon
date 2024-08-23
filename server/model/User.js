const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    gender: String,
    loginCount: { type: Number, default: 0 },
    lastLoginDate: { type: Date, default: null },
});

const User = mongoose.model('user_data', UserSchema);
module.exports={User}