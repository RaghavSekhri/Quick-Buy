var express = require('express');
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var port = process.env.PORT || 2406;
var jwt = require('jsonwebtoken')

app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

const mongoURI = 'mongodb+srv://raghav:sekhri@cluster0-etbce.mongodb.net/test?retryWrites=true&w=majority'

mongoose
 .connect(mongoURI, {useNewUrlParser: true,useUnifiedTopology:true,useNewUrlParser:true})
 .then(() => console.log("MongoDB connected"))
 .catch(err => console.log(err))

//  var Users = require('./routes/Users')

 app.use('/users', require('./routes/Users'))
 
 app.use('/AddData', require('./routes/datausers') )

 app.listen(port, () => {
     console.log("Server is running on port: " + port)
 })