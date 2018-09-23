const router = require('express').Router();
const User = require('../modals/user');


router.get('/signup',function(req,res,next){
res.render('create-account/signup',{
    errors: req.flash('errors')
});
});

router.post('/signup',function(req,res){
const user = new User();
user.profile.name = req.body.name;
user.email = req.body.email;
user.password = req.body.password;

User.findOne({ email:req.body.email}, function(err,existingUser){
	if(existingUser){
		 req.flash('errors','Email already exist ');
      return res.redirect('/signup');
       }
    else{
    	user.save(function(err,user){
    		if(err) return next(err);
    		
            return res.redirect('/signup');

             });
    }
});
});
module.exports = router;