require("./models/User");
require("./models/Track");

const express = require("express");
require('custom-env').env()
const mongoose = require("mongoose");
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require("./routes/trackRoutes");
const bodyParser = require("body-parser");
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);
console.log("proces ",process.env.PASSWORD);
const mongoUri = `mongodb+srv://admin:${process.env.PASSWORD}@cluster0.x7rba.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useCreateIndex:true
})

mongoose.connection.on('connected',() => {
    console.log("Connected to mongo instance");
})

mongoose.connection.on('error',() => {
    console.error("Error connecting to mongo")
})

app.get("/",requireAuth,(req,res) => {
    
    res.send(`Your email is ${req.user.email}`)
})

app.listen(3000,() => {
    console.log(process.env.PASSWORD)
    console.log("Listening on port 3000");
    
})