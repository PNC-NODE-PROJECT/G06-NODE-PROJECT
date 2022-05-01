const express=require("express");
const app=express();
const PORT = 3000;
const cors = require ("cors")
app.use(cors({origin:"*"}))
app.use(express.json()); 
app.use(express.urlencoded());
const questionRoute = require("./routes/question")

// import model collection 
const quizModel = require("./models/quizz_models").quizModel;
const userModel = require("./models/quizz_models").userModel;

// Define static route
app.use(express.static("public"));

// server
app.listen(PORT, () => {
    console.log("Server run on http://localhost:3000");
  });
// get question by id
app.get('/get_question_by_id/:id',(req,res)=>{
  quizModel.find({_id:req.params.id})
  .then((result) => {
    res.send(result);
  }).catch((err) => {
    res.send(err);
  });
})
//   get all the question 
app.get('/get_question',(req,res)=>{
    quizModel.find()
      .then((result)=>{
        res.send(result);
      })
      .catch((error)=>{
          res.send(error);
      })
  });


//   add the question 
app.post('/add_question',(req,res)=>{
    quizModel.create(req.body)
    .then((result)=>{
      res.send(result);
   })
   .catch((error)=>{
       res.send(error);
   })
  });

//   eidt questions
app.put('/update_data/:id',(req,res)=>{
    quizModel.updateOne({"_id": req.params.id},{$set:(req.body)})
    .then((result)=>{
      console.log(result);
       res.send(result);
    })
    .catch((error)=>{
        res.send(error);
    })
  });

//   delete questions
app.delete('/delete_data/:id',(req,res)=>{
    quizModel.deleteOne({_id:req.params.id})
    .then((result)=>{
       res.send(result);
    })
    .catch((error)=>{
        res.send(error);
    })
  });



  
// get all user from mongoDB
app.get('/login',(req,res)=>{
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
app.post('/signup',(req,res)=>{
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
