const express=require("express");
const app=express();
const PORT = 3000;
const cors = require ("cors")
app.use(cors({origin:"*"}))
app.use(express.json()); 
app.use(express.urlencoded());
let questionRoute = require("./routes/question");
let userRoute = require("./routes/userRoute");



// Define static route
app.use(express.static("public"));

// server
app.listen(PORT, () => {
  console.log("Server run on http://localhost:3000");
});


app.use('/question',questionRoute);
app.use('/users',userRoute);
