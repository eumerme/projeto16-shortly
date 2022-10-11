import bcrypt from "bcrypt";
import { connection } from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";

async function signup(req, res) {
	const { name, email, password } = req.body;
	const password_hash = bcrypt.hashSync(password, 10);

	try {
		await connection.query(
			`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,
			[name, email, password_hash]
		);
		return res.sendStatus(STATUS_CODE.CREATED);
	} catch (error) {
		console.error(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

export { signup };
