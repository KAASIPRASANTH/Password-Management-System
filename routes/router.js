const express = require('express')
const route = express.Router() /* Allows us to create different router separately */


/* services simplifies the long code for response(GET) */
const services = require('../services/render');
const controller = require('../controller/controller');

//initial condition
route.get("/",async(req,res)=>{
    if(req.isAuthenticated()){
        res.redirect('/index1');
    }else{
        res.render("index");
    }
});


route.get('/index1',services.homeRoutes);

route.get('/add-user',services.add_user);

route.get('/update-user',services.update_user);




//  CRUD API
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);


module.exports = route