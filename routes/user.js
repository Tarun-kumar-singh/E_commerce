const router = require('express').Router();
const User = require('../modals/user');


router.get('/signup',function(req,res,next){
res.render('create-account/signup');
});

router.post('/signup',function(req,res){
const user = new User();
user.profile.name = req.body.name;
user.email = req.body.email;
user.password = req.body.password;

User.findOne({ email:req.body.email}, function(err,existingUser){
	if(existingUser){
		console.log(req.body.email + " is aalready exist ");
         
        res.redirect('/signup');
       return;
	}
    else{
    	user.save(function(err,user){
    		if(err) return next(err);
    		res.json("New user created ");
    	});
    }
});
});
module.exports = router;