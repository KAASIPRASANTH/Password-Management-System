//require mongoose, passport-local-mongoose
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

//create schema

const userSchema = new mongoose.Schema({
    username:String,
    password:String
});

//hash password using passport-local-mongoose
userSchema.plugin(passportLocalMongoose);

//export user module
const User = mongoose.model('User',userSchema);

module.exports = User;
