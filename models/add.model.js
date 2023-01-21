const mongoose=require('mongoose')
const Joi = require("joi");
const userSchema=new mongoose.Schema({
   value:{
    type:Number,
    require:true,
	default:0
}
})
const validate = (add) => {
	const schema = Joi.object({
		value: Joi.number().required().label("value"),
	});
	return schema.validate(add);
};
const ADD=mongoose.model('add',userSchema);

module.exports = {ADD, validate };
