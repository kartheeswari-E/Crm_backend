const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const Joi = require("joi");
const userSchema=new mongoose.Schema({
 car_name:{
    type:String,
    require:true,
},
car_img:{
    type:String,
    require:true,
},
car_model:{
    type:String,
    require:true,
},
car_price:{
    type:String,
    require:true,
},
drive:{
    type:String,
    require:true,
},
speed:{
    type:String,
    require:true,
},
Registration:{
    type:String,
    require:true,
},
Registered_in:{
    type:String,
    require:true,
},
Fuel:{
    type:String,
    require:true,
},
Owned_by:{
    type:String,
    require:true,
},
Insurance:{
    type:String,
    require:true,
},
Road_Tax:{
    type:String,
    require:true,
},
Engine_capacity:{
    type:String,
    require:true,
},
Spare_Key:{
    type:String,
    require:true,
}

})
const validate = (car) => {
	const schema = Joi.object({
		car_name: Joi.string().required().label("car_name"),
        car_model: Joi.string().required().label("car_model"),
        car_price: Joi.string().required().label("car_price"),
        car_img: Joi.string().required().label("car_img"),
        drive: Joi.string().required().label("drive"),
        Speed: Joi.string().required().label("Speed"),
        Registration: Joi.string().required().label("Registration"),
        Registered_in: Joi.string().required().label("Registered_in"), 
       Fuel: Joi.string().required().label("Fuel"),
      Owned_by: Joi.string().required().label("Owned_by"),
      Insurance: Joi.string().required().label("Insurance"),
     Road_Tax: Joi.string().required().label("Road_Tax"),
     Engine_capacity: Joi.string().required().label("Engine_capacity"),
    Spare_Key: Joi.string().required().label("Spare_Key")
  
	
	});
	return schema.validate(car);
};
const CAR=mongoose.model('car',userSchema);

module.exports = {CAR, validate };
