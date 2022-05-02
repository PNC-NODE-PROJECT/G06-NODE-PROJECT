const express = require("express");
const router = express.Router();
const userModel = require("../models/quizz_models").userModel;


// get all user from mongoDB
router.get('/login',(req,res)=>{
    let username = req.query.username;
    let password = req.query.password;
    let body = {};
    let isValid = false;
    body['username']=username;
    body['password']=password;
    console.log(body);
    userModel.find(body)
    .then((result)=>{
        if (result.length>0 ){
          isValid=true;
        }
        res.send(isValid);
    })
    .catch((error)=>{
        res.send(error);
    })
  });
  
  
  // create users
  router.post('/signup',(req,res)=>{
    let body = req.body;
    let username = body['username'];
    let password = body['password'];
    let validation = false;
    if (username !=="" && password !==""){
      validation = true;
    }
   if (validation==true){
    userModel.create(body)
    .then((result)=>{
        res.send(result);
    })
    .catch((error)=>{
        res.send(error);
    })
   }
  })
  

module.exports = router;
