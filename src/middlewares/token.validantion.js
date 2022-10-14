import jwt from "jsonwebtoken";
import { connection } from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { TABLE } from "../enums/tables.js";

async function tokenValidation(req, res, next) {
	const token = req.headers.authorization?.replace("Bearer ", "");

	try {
		const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET);

		const { rows: isValidToken } = await connection.query(
			`SELECT * FROM ${TABLE.SESSIONS} WHERE "userId" = $1 AND token = $2 AND valid = TRUE;`,
			[verifyToken.userId, token]
		);
		if (isValidToken.length === 0) {
			return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
		}

		res.locals.userId = verifyToken.userId;
	} catch (error) {
		await connection.query(`DELETE FROM ${TABLE.SESSIONS} WHERE token = $1;`, [
			token,
		]);
		return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
	}

	next();
}

export { tokenValidation };
