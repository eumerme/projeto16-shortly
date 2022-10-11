import Joi from "joi";

const schemas = {
	signupPOST: Joi.object().keys({
		name: Joi.string().trim().required(),
		email: Joi.string().trim().email().required(),
		password: Joi.string().trim().required(),
		confirmPassword: Joi.ref("password"),
	}),
};

export { schemas };
