import { STATUS_CODE } from "../enums/statusCode.js";
import { schemas } from "../schemas/schemas.js";

async function urlBodyValidation(req, res, next) {
	const { error } = schemas.urlPOST.validate(req.body);
	if (error) {
		const message = error.details.map((detail) => detail.message).join(",");
		return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send({ message });
	}

	next();
}

export { urlBodyValidation };
