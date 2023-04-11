const mongoose = require('mongoose');
var schema = new mongoose.Schema({
    PlatformName:{
        type:String,
        required:true,
        unique:false
    },
    email1:{
        type:String,
        unique:false
    },
    email2:{
        type:String,
        unique:false
    },
    Password:String
})

const Userdb = mongoose.model('userdb',schema);

module.exports = Userdb