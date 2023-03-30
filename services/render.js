const axios = require('axios');
const session = require("express-session");
exports.homeRoutes = (req,res)=>{
    console.log(req.body.username);
    //console.log(req.session.username);
    if(req.isAuthenticated()){
        //Make a get request to/api/users
        try {
            axios.get("http://localhost:5500/api/users")
            .then(function(response){
                res.render('index1',{users:response.data,isAuth:req.isAuthenticated()});
            })
            .catch(err=>{
                res.send(err);
            })
            /*res.render('index',{users:"New Data"});*/
            } catch (err) {
            console.log("Error in catch");
            res.send(err);
        }
    }else{
        res.render("index");
    }
}

exports.add_user = (req,res)=>{
    if(req.isAuthenticated()){
        res.render('add_user');
    }else{
        res.render("index");
    }
}

exports.update_user = (req,res)=>{
    if(req.isAuthenticated()){
        axios.get('http://localhost:5500/api/users',{params:{id:req.query.id}})
        .then(function(userdata){
            res.render("update_user",{user:userdata.data}) // to set a default values to the current page 
        })
        .catch(err=>{
            res.send(err);
        })
    }else{
        res.render("index");
    }
    //res.render('update_user');
}