const {userSchema} = require('./schemas');
const mongoose = require('mongoose');

exports.UserModel = mongoose.model('Users', userSchema);
