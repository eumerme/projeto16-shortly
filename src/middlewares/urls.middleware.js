import { STATUS_CODE } from "../enums/statusCode.js";
import * as urlsRepository from "../repositories/urls.repository.js";

async function urlBodyValidation(req, res, next) {
	const { url } = req.body;
	const validUrl =
		url.substring(0, 7) === "http://" || url.substring(0, 8) === "https://";

	if (!validUrl) {
		return res
			.status(STATUS_CODE.UNPROCESSABLE_ENTITY)
			.send({ message: `"url" must be a valid URL` });
	}

	next();
}

async function urlIdValidation(req, res, next) {
	const { userId, id } = res.locals;

	try {
		const { rows: url } = await urlsRepository.selectUrlById(id);
		if (url.length === 0) {
			return res.sendStatus(STATUS_CODE.NOT_FOUND);
		}

		const { rows: urlOwner } = await urlsRepository.selectUrlByIdandUserId(
			id,
			userId
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

export { urlBodyValidation, urlIdValidation };
