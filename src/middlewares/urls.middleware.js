import { connection } from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { TABLE } from "../enums/tables.js";
import { schemas } from "../schemas/schemas.js";

async function URLBodyValidation(req, res, next) {
	const { error } = schemas.urlPOST.validate(req.body);
	if (error) {
		const message = error.details.map((detail) => detail.message).join(",");
		return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send({ message });
	}

	next();
}

async function URLIdValidation(req, res, next) {
	const { userId } = res.locals;
	const { id } = req.params;

	try {
		const { rows: url } = await connection.query(
			`SELECT * FROM ${TABLE.URLS} WHERE id = $1`,
			[id]
		);
		if (url.length === 0) {
			return res.sendStatus(STATUS_CODE.NOT_FOUND);
		}

		const { rows: urlOwner } = await connection.query(
			`SELECT * FROM ${TABLE.URLS} WHERE id = $1 AND "userId" = $2;`,
			[id, userId]
		);
		if (urlOwner.length === 0) {
			return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
		}
	} catch (error) {
		console.error(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	next();
}

export { URLBodyValidation, URLIdValidation };
