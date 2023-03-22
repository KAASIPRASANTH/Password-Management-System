require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const bodyparser = require("body-parser");
const path = require('path');

//require routes
const authRoute = require('./routes/auth');
const quoteRoute = require('./routes/quotes');
const mainRoute = require('./routes/router');
//setup
const app = express();

//setup view engine
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.static("assets"));

app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

//setup session
app.use(session({
    secret: process.env.SECRET,
    resave:true,
    saveUninitialized:false
}));

//initialize passport
app.use(passport.initialize());

//use passport to deal with session
app.use(passport.session());

//connect to database..
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_CONNECT)
.then(()=>console.log('database connected'))
.catch(err=>console.log(err))

//use routes
app.use('/',authRoute);
app.use('/',quoteRoute);
app.use('/',mainRoute);

//start the server
app.listen(process.env.PORT,()=>console.log("Server is Running"));
