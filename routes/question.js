// const express = require("express");
// const router = express.Router();
// const quizModel = require("../model/quizz_model").quizModel;

// // get question by id
// router.get('/get_question_by_id/:id',(req,res)=>{
//     quizModel.find({_id:req.params.id})
//     .then((result) => {
//       res.send(result);
//     }).catch((err) => {
//       res.send(err);
//     });
//   })

// //   get all the question 
// router.get('/get_question',(req,res)=>{
//     quizModel.find()
//       .then((result)=>{
//         res.send(result);
//       })
//       .catch((error)=>{
//           res.send(error);
//       })
//   });


// //   add the question 
// router.post('/add_question',(req,res)=>{
//     quizModel.create(req.body)
//     .then((result)=>{
//       res.send(result);
//    })
//    .catch((error)=>{
//        res.send(error);
//    })
//   });

// //   eidt questions
// router.put('/update_data/:id',(req,res)=>{
//     quizModel.updateOne({"_id": req.params.id},{$set:(req.body)})
//     .then((result)=>{
//       console.log(result);
//        res.send(result);
//     })
//     .catch((error)=>{
//         res.send(error);
//     })
//   });

// //   delete questions
// router.delete('/delete_data/:id',(req,res)=>{
//     quizModel.deleteOne({_id:req.params.id})
//     .then((result)=>{
//        res.send(result);
//     })
//     .catch((error)=>{
//         res.send(error);
//     })
//   });

// module.exports = router;

