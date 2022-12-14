import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { STATUS_CODE } from "../enums/statusCode.js";
import * as authRepository from "../repositories/auth.repository.js";

async function signup(req, res) {
	const { name, email, password } = req.body;
	const password_hash = bcrypt.hashSync(password, 10);

	try {
		await authRepository.insertUserIntoUsers(name, email, password_hash);
		return res.sendStatus(STATUS_CODE.CREATED);
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

async function signin(req, res) {
	const { password } = req.body;
	const { user } = res.locals;
	const validPassword = bcrypt.compareSync(password, user.password);

	try {
		if (!validPassword) {
			return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
		}

		const fiveHours = 18000;
		const token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, {
			expiresIn: fiveHours,
		});

		const { rows: sessionExists } = await authRepository.selectUserFromSessions(
			user.id
		);
		if (sessionExists.length !== 0) {
			await authRepository.deleteUserFromSessions(sessionExists[0].token);
		}

		await authRepository.insertUserIntoSessions(user.id, token);
		return res.status(STATUS_CODE.OK).send({ token });
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

export { signup, signin };
