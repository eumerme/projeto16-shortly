import { connection } from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { TABLE } from "../enums/tables.js";

async function userValidation(req, res, next) {
	const { path } = req.route;
	try {
		const { rows: user } = await connection.query(
			`SELECT * FROM ${TABLE.USERS} WHERE email = $1;`,
			[req.body.email]
		);
		if (user.length !== 0 && path === "/signup") {
			return res.sendStatus(STATUS_CODE.CONFLICT);
		}
		if (user.length === 0 && path === "/signin") {
			return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
		}

		res.locals.user = user[0];
	} catch (error) {
		console.error(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	next();
}

export { userValidation };
