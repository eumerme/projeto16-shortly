import { STATUS_CODE } from "../enums/statusCode.js";
import * as userRepository from "../repositories/user.repository.js";

async function getUserData(req, res) {
	const { userId } = res.locals;

	try {
		const { rows: userData } = await userRepository.selectUserData(userId);

		if (userData.length === 0) {
			return res.sendStatus(STATUS_CODE.NOT_FOUND);
		}

		const userDataWithNoLink = userData[0].shortenedUrls[0].id === null;
		if (userDataWithNoLink) {
			userData[0].shortenedUrls = [];
		}

		return res.status(STATUS_CODE.OK).send(userData[0]);
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

async function getRanking(req, res) {
	try {
		const { rows: ranking } = await userRepository.listRanking();
		return res.status(STATUS_CODE.OK).send(ranking);
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

export { getUserData, getRanking };
