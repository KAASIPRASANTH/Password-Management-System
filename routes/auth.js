//express router
const router = require('express').Router();
const passport = require('passport');
const session = require("express-session");
//user Model
const User = require('../models/User');

//create passport local strategy
passport.use(User.createStrategy());

//serialize and deserialize user
passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser(async (id,done)=>{
    try {
        const user = await User.findById(id);
        done(null,user);
    } catch (error) {
        done(error,false);
    }
});




//register user in DB
router.post("/auth/register",async(req,res)=>{
    try {
        //register user
        const registerUser = await User.register({username:req.body.username},req.body.password);
        if(registerUser){
            passport.authenticate("local")(req,res,function(){
                res.redirect("/index1"); 
            });
        }else{
            res.redirect("/register");
        }

    } catch (err) {
        res.send(err);
    }
});

//login user
router.post("/auth/login",async(req,res)=>{
    
    //create new user obj
    const user = new User({
        username:req.body.username,
        password:req.body.password
    });
    //req.session = {username:req.body.username};
    //using passport we just checking crt or not
    req.login(user,(err)=>{
        if(err){
            console.log(err);
        }else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/index1");
            });
        }
    });
});



router.get('/auth/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
});

/*
//logout router
router.get('/auth/logout', function(req, res, next) {
    console.log("LOGOUT");
    req.logout(function(err) {
      if (err) { 
        console.log("s2");
        res.send(err);
        //return next(err); 
      }
      console.log("thanks");
      res.redirect('/');
    });
  });

*/
//export router
module.exports = router;
