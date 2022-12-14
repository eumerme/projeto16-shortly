import jwt from "jsonwebtoken";
import { STATUS_CODE } from "../enums/statusCode.js";
import * as authRepository from "../repositories/auth.repository.js";

async function tokenValidation(req, res, next) {
	const token = req.headers.authorization?.replace("Bearer ", "");

	try {
		const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET);

		const { rows: isValidToken } = await authRepository.selectUserToken(
			verifyToken.userId,
			token
		);
		if (isValidToken.length === 0) {
			return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
		}

		res.locals.userId = verifyToken.userId;
	} catch (error) {
		await authRepository.deleteUserFromSessions(token);
		return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
	}

	next();
}

export { tokenValidation };
