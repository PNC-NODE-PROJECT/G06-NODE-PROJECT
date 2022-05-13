// Require for env file
require('dotenv').config();
const express=require("express");
const app=express();
const cors = require ("cors")
app.use(cors({origin:"*"}))
app.use(express.json()); 
app.use(express.urlencoded());
let questionRoute = require("./routes/question");
let userRoute = require("./routes/userRoute");
const PORT = process.env.PORTS


// Define static route
app.use(express.static("public"));

// server
app.listen(PORT, () => {
  console.log("Server run on http://localhost:"+PORT);
});


app.use('/question',questionRoute);
app.use('/users',userRoute);
