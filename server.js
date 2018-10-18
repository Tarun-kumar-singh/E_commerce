var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-Parser');
var flash = require('express-flash');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');

var app = express();

var secret =  require('./config/secret');
var User = require('./modals/user');
 
mongoose.connect(secret.database, { useNewUrlParser: true })
 .then(() => console.log('Connected to MongooDB...'))
  .catch(err => console.error('Could not connect to MongoDB..',err));

//Middleware
app.use(morgan('dev'));//Way to use the mogan middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.engine('ejs',engine);
app.use(session({ 
	resave:true,
	saveUninitialized:true,
    secret:secret.secretKey,
	store: new MongoStore({ url: secret.database, autoReconnect:true})
	 }));
app.use(cookieParser());
app.use(flash());
app.set('view engine','ejs');


//routes

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
app.use(mainRoutes);
app.use(userRoutes);

app.listen(secret.port,function(err){
if(err) console.error(err);
console.log("Server is running on port..." + secret.port);
});
