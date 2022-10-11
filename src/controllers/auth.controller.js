import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { connection } from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { TABLE } from "../enums/tables.js";

async function signup(req, res) {
	const { name, email, password } = req.body;
	const password_hash = bcrypt.hashSync(password, 10);

	try {
		await connection.query(
			`INSERT INTO ${TABLE.USERS} (name, email, password) VALUES ($1, $2, $3);`,
			[name, email, password_hash]
		);
		return res.sendStatus(STATUS_CODE.CREATED);
	} catch (error) {
		console.error(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

async function signin(req, res) {
	const { password } = req.body;
	const { user } = res.locals;
	const validPassword = bcrypt.compareSync(password, user.password);

	try {
		if (validPassword) {
			const token = uuid();

			await connection.query(
				`INSERT INTO ${TABLE.SESSIONS} ("userId", token) VALUES ($1, $2);`,
				[user.id, token]
			);
			return res.status(STATUS_CODE.OK).send({ token });
		} else {
			return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
		}
	} catch (error) {
		console.error(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

export { signup, signin };
