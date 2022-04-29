const express=require("express");
const app=express();
const PORT = 3000;
const cors = require ("cors")
app.use(cors({origin:"*"}))
app.use(express.json()); 
app.use(express.urlencoded());

// import model collection 
const quizModel = require("./model/quizz_model").quizModel;
const userModel = require("./model/quizz_model").userModel;

// Define static route
app.use(express.static("public"));

// server
app.listen(PORT, () => {
    console.log("Server run on http://localhost:3000");
  });

//   get all the question 
app.get('/get_question',(req,res)=>{
    quizModel.find()
      .then((result)=>{
        res.send(result);
          // res.send(result);
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

