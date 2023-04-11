const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    email:{
        type:String,
        unique:false
    }
});

const currentUser = mongoose.model('currentUser',schema);

module.exports = currentUser;