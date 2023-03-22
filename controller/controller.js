var Userdb = require('../models/model');




//create ans save new user
exports.create = (req,res)=>{
    //validate the request

    //post method with empty body
    if(!req.body){
        res.status(400).send({message:"Content can not be empty!"});
        return;
    }
    
    //New User
    const user = new Userdb({
        PlatformName:req.body.PlatformName,
        email1:req.body.email1,
        email2:req.body.email2,
        Password:req.body.Password
    })

    //save user in the dataBase
    user
        .save(user)
        .then(data=>{
            /*res.send(data) we should not return the data*/ 
            /* Instead we should redirect */
            res.redirect('/add-user');
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message||"Some error occured while inserting your data"
            });
        });
}



//retrieve and return all users/retrive and return a single user
exports.find = (req,res)=>{

    //getting an single user
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message:"Not found user with id "+id})
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Error retrieving user with id "+id})
            })
    }else{
        //for getting multiple user
        Userdb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message:err.message || "Error Occurred while retrieving user information"})
        })
    }
}




//Update a new identified user by user id
exports.update = (req,res)=>{
    if(!req.body){
        res.status(400).send({message:"Data to update can not be empty!"});
        return;
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message: `Cannot update user with ${id}. Maybe user not found`})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error Update user information"})
    })
}




//Delete a user withy specified id in the request
exports.delete = (req,res)=>{
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message:"User was deleted successfully!"
                })
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:"Could not delete User with id="+id
            });
        });
}