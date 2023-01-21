const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const userSchema=new mongoose.Schema({
    name:{
    type:String,
    require:true,
},

    email:{
     type: String,
    require:true,
  
},

    car_model:{
    type:String,
    require:true,
  
},
car_name:{
    type:String,
    require:true,
  
},
msg:{
    type:String,
    require:true,
  
},
solution:{
    type:String,
    require:true,
  
},
mentor:{
    type:String,
    require:true,
  
}
},{
    timestamps:true,
})
userSchema.methods.generateAuthToken= function(){
const token=jwt.sign({_id:this._id},process.env.JWT_PRIVATEKEY)
return token;
}
const validate = (doubt) => {
	const schema = Joi.object({
		name: Joi.string().required().label("name"),
		email: Joi.string().email().required().label("email"),
		car_name:passwordComplexity().required().label("car_name"),
        car_model:passwordComplexity().required().label("car_model"),
       msg:passwordComplexity().required().label("msg"),
       mentor:passwordComplexity().required().label("mentor"),
        solution:passwordComplexity().required().label("solution"),
	});
	return schema.validate(doubt);
};
const DOUBT=mongoose.model('doubt',userSchema);

module.exports = {DOUBT, validate };
