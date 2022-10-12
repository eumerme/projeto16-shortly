import { connection } from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { TABLE } from "../enums/tables.js";
import { schemas } from "../schemas/schemas.js";

async function signupBodyValidation(req, res, next) {
	const { error } = schemas.signupPOST.validate(req.body, {
		abortEarly: false,
	});
	if (error) {
		const message = error.details
			.map((detail) => detail.message)
			.join(",")
			.replace("[ref:password]", "equal to password");
		return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send({ message });
	}

	try {
		const { rows: emailExists } = await connection.query(
			`SELECT * FROM ${TABLE.USERS} WHERE email = $1;`,
			[req.body.email]
		);
		if (emailExists.length !== 0) {
			return res.sendStatus(STATUS_CODE.CONFLICT);
		}
	} catch (error) {
		console.error(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	next();
}

async function signinBodyValidation(req, res, next) {
	const { error } = schemas.signinPOST.validate(req.body, {
		abortEarly: false,
	});
	if (error) {
		const message = error.details.map((detail) => detail.message).join(",");
		return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send({ message });
	}

	try {
		const { rows: user } = await connection.query(
			`SELECT * FROM ${TABLE.USERS} WHERE email = $1;`,
			[req.body.email]
		);
		if (user.length === 0) {
			return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
		}

		res.locals.user = user[0];
	} catch (error) {
		console.error(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	next();
}

export { signupBodyValidation, signinBodyValidation };
