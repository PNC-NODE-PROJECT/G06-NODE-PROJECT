const mongoose = require ("mongoose");

// Require for env file
require('dotenv').config();
// connect to mongoDB
mongoose.connect(process.env.DB_CONNECTION,{useUnifiedTopology:true});  

// define schema for each collection
const quizzSchema = new mongoose.Schema({
    question:{
        type:String,
    },
    answers:{
        answer1:{
            type:String,
        },
        answer2:{
            type:String,
        },
        answer3:{
            type:String,
        },
        answer4:{
            type:String,
        }
    },
    correctAnswer:{
        type:String,
    },
    title:{
        type:String,
    }
});

const usersSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    password:{
        type:String,
    },
    quizzs:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'quizs'
    }
});


// create model for each task collection
const quizModel = mongoose.model("quizs",quizzSchema);
const userModel = mongoose.model("users",usersSchema);

module.exports.quizModel = quizModel;
module.exports.userModel = userModel;