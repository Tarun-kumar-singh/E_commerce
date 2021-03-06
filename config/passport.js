var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy();


// Serialization and Deserialization 
passport.serializeUser(function(user, done){
done(null, user._id);	
});

passport.deserializeUser(function(id, done){
	User.findById(id, function(err, user){
		done(err. user);
	});
});

//Middleware

passport.use('local-login',new LocalStrategy({ 
usernameField: 'email',
passwordfield: 'password',
passReqToCallback: true
	 },function(req,email,password,done){
	 	User.findOne({ email: email}, function(err,user){ 
	 		if (err) { return done(err); }
            if(!user){ return done(null,false,req.flash('loginmessage','No user found')); }
             if (!user.comparePassword(password){
             	return done(null,false,req.flash('loginmessage','wrong password ')); 
             	}
				return done(null,user);
		}); 
             });
return done(null, user);
	 	}));


// custom function to validate
export.isAuthenticated = function(req,res, next){
	if(req.isAuthenticated()){
	return next();
	}
	res.redirect('/login');
}



