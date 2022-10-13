import dayjs from "dayjs";
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

		const isExpired = dayjs().diff(session[0].createdAt, "day");
		if (isExpired === 3) {
			await connection.query(
				`DELETE FROM ${TABLE.SESSIONS} WHERE token = $1;`,
				[token]
			);
			return res
				.status(STATUS_CODE.UNAUTHORIZED)
				.send({ message: "Sessão expirada." });
		}

		res.locals.userId = session[0].userId;
	} catch (error) {
		console.error(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	next();
}

export { tokenValidation };
