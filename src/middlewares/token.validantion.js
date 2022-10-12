import { connection } from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { TABLE } from "../enums/tables.js";

async function tokenValidation(req, res, next) {
	const token = req.headers.authorization?.replace("Bearer ", "");
	if (!token) {
		return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
	}

	try {
		const { rows: session } = await connection.query(
			`SELECT * FROM ${TABLE.SESSIONS} WHERE token = $1;`,
			[token]
		);
		if (session.length === 0) {
			return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
		}

		res.locals.userId = session[0].userId;
	} catch (error) {
		console.error(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	next();
}

export { tokenValidation };
