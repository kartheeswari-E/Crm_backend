const bcrypt = require("bcrypt");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const {CRM} = require("../models/createuser.model");
const router = require("express").Router();

router.post("/", async (req, res) => {
	try {
        const { error } = validate(req.body);
        if (error)
		 return res.status(400).send(error.details[0].message);

        const user = await CRM.findOne({ email: req.body.email });
        if (!user)
		 return res.status(400).send("Invalid email or password");

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res.status(400).send("Invalid email or password");

        const token = user.generateAuthToken();
		res.status(200).send({data:token,message: "logged in successfully" });
    } catch(error){
		res.status(500).send({message: "internal server"});
console.log(error)
	}
});


const validate = (userlogin) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("email"),
		password:passwordComplexity().required().label("password"),
	});
	return schema.validate(userlogin);
};
module.exports = router;