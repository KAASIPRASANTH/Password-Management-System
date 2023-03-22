//require mongoose
const mongoose = require('mongoose');

//create schema
const quoteSchema = new mongoose.Schema({
    quote:String,
    bgColor:{
        type:String,
        default:'46244c',

    },
    likes:{
        type:Number,
        default:0
    }
},
{
    timestamps:true
}
);

//export user module
const Quote = mongoose.model('Quote',quoteSchema);

module.exports = Quote;
