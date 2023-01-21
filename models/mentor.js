const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const userSchema=new mongoose.Schema({
    img:{
    type:String,
    require:true,
},

    name:{
     type: String,
    require:true,
  
},

    experience:{
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
const validate = (mentor) => {
	const schema = Joi.object({
		name: Joi.string().required().label("name"),
		img: Joi.string().email().required().label("img"),
		experience:passwordComplexity().required().label("experience"),
	});
	return schema.validate(mentor);
};
const MENTOR=mongoose.model('mentor',userSchema);

module.exports = {MENTOR, validate };
