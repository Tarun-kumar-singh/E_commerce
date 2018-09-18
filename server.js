var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./modals/user');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('session');
var cookieParser = require('cookie-Parser');
var flash = require('express-flash');

var app = express();

mongoose.connect('mongodb://localhost/User',function(err){

if(err)
	console.log(err);
else{
	console.log("Connected to database ");
}

});

//Middleware
app.use(morgan('dev'));//Way to use the mogan middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.engine('ejs',engine);
app.set('view engine','ejs');


//routes

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
app.use(mainRoutes);
app.use(userRoutes);



app.listen(3000,function(err){
if(err) console.error(err);
console.log("Server is running on port 3000...");
});
