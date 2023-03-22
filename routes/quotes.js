const router = require('express').Router();

const Quote = require("../models/Quotes");
//const router = require('./auth');

/*
//get home
router.get("/",async(req,res)=>{
    if(req.isAuthenticated()){
        res.redirect('/quotes');
    }else{
        res.render("index");
    }
});
*/
//get reg page
router.get("/register",async(req,res)=>{
    if(req.isAuthenticated()){
        res.redirect('/index1');
    }else{
        res.render("register");
    }
});

//login page
router.get("/login",async(req,res)=>{
    if(req.isAuthenticated()){
        res.redirect('/index1');
    }else{
        res.render("login");
    }
});


/*
//get quotes
router.get("/quotes",async (req,res)=>{
    console.log("Begin");
    try {
        const allQuotes = await Quote.find();
        console.log("success");
        res.render("quotes",{allQuotes,isAuth:req.isAuthenticated()});
    } catch (err) {
        console.log("Error in catch");
        res.send(err);
    }
});
*/



/*
//get submit page
router.get("/submit",async(req,res)=>{
    if(req.isAuthenticated()){
        res.render('submit');
    }else{
        res.redirect("/register");
    }
});
*/



//POST
//submit a quote and add date to DB
router.post("/submit", async(req,res)=>{
    try {
        const quote = new Quote({
        quote:req.body.quote,
        bgColor:req.body.bgcolor.substring(1) 
        });

        //save
        const saveQuote = quote.save();

        !saveQuote && res.redirect('/submit');
        res.redirect('/quotes');

    } catch (err) {
        res.send(err);
    }
});


//like quotes


//export
module.exports = router;
