const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    
});

const User = mongoose.model("User", UserSchema);
module.exports = User;