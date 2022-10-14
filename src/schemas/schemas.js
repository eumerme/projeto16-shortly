import Joi from "joi";

const schemas = {
	signupPOST: Joi.object().keys({
		name: Joi.string().trim().required(),
		email: Joi.string().trim().email().required(),
		password: Joi.string().trim().required(),
		confirmPassword: Joi.ref("password"),
	}),
	signinPOST: Joi.object().keys({
		email: Joi.string().trim().email().required(),
		password: Joi.string().trim().required(),
	}),
	urlPOST: Joi.object().keys({
		url: Joi.string().trim().uri().required(),
	}),
	paramsId: Joi.object().keys({
		id: Joi.number().positive().integer(),
	}),
	paramsShortUrl: Joi.object().keys({
		shortUrl: Joi.string().trim().length(8).required(),
	}),
};

export { schemas };
