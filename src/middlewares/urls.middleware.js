import { connection } from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { TABLE } from "../enums/tables.js";
import { schemas } from "../schemas/schemas.js";

async function urlBody(req, res, next) {
	const { error } = schemas.urlPOST.validate(req.body);
	if (error) {
		const message = error.details.map((detail) => detail.message).join(",");
		return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send({ message });
	}

	next();
}

async function paramsId(req, res, next) {
	let { id } = req.params;
	id = id.trim();

	const { value, error } = schemas.paramsId.validate({ id });
	if (error) {
		const message = error.details.map((detail) => detail.message).join(",");
		return res.status(STATUS_CODE.BAD_REQUEST).send({ message });
	}
	res.locals.id = value.id;

	next();
}

async function paramsShortUrl(req, res, next) {
	const { error } = schemas.paramsShortUrl.validate(req.params);
	if (error) {
		const message = error.details.map((detail) => detail.message).join(",");
		return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send({ message });
	}

	next();
}

async function urlId(req, res, next) {
	const { userId, id } = res.locals;

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

export { urlBody, urlId, paramsId, paramsShortUrl };
