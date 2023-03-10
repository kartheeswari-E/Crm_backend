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

    password:{
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
const validate = (crt) => {
	const schema = Joi.object({
		name: Joi.string().required().label("name"),
		email: Joi.string().email().required().label("email"),
		password:passwordComplexity().required().label("password"),
	});
	return schema.validate(crt);
};
const CRM=mongoose.model('crt',userSchema);

module.exports = {CRM, validate };
