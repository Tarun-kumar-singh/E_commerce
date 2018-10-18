var mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

var userschema = new Schema({

  email:{ type:String, unique:true, lowercase:true },
  password: { type:String },
  profile:{
          name:{ type:String},
          picture:{ type:String, default:''},
  },
  address:{ type:String },
  history:{
         date:Date,
         paid:{ type:Number, default:0 }
   }
});

userschema.pre('save',function(next){
var user = this;
if(!user.isModified('password')) return next();
bcrypt.genSalt(10,function(err,salt){
  if(err) return next(err);
  bcrypt.hash(user.password,salt,null,function(err,hash){
  if(err) return next(err);
  user.password=hash;
  next();

  });

});
});

userschema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model('User',userschema);

