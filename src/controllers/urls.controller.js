import { STATUS_CODE } from "../enums/statusCode.js";
import { nanoid } from "nanoid";
import * as urlsRepository from "../repositories/urls.repository.js";

async function createShortenUrl(req, res) {
	const { userId } = res.locals;
	const { url } = req.body;
	const shortUrl = nanoid(8);

	try {
		await urlsRepository.insertUrlIntoUrls(userId, url, shortUrl);
		return res.status(STATUS_CODE.CREATED).send({ shortUrl });
	} catch (error) {
		console.error(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

async function getUrlById(req, res) {
	const { id } = res.locals;

	try {
		const { rows: url } = await urlsRepository.selectUrlById(id);
		if (url.length === 0) {
			return res.sendStatus(STATUS_CODE.NOT_FOUND);
		}
		return res.status(STATUS_CODE.OK).send(url[0]);
	} catch (error) {
		console.error(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

async function redirectToUrl(req, res) {
	const { shortUrl } = req.params;

	try {
		const { rows: url } = await urlsRepository.selectUrlByShortUrl(shortUrl);
		if (url.length === 0) {
			return res.sendStatus(STATUS_CODE.NOT_FOUND);
		}

		await urlsRepository.updateVisitCount(shortUrl);

		return res.redirect(url[0].url);
	} catch (error) {
		console.error(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

async function deleteUrlById(req, res) {
	const { id } = res.locals;

	try {
		await urlsRepository.deleteUrlFromUrls(id);
		return res.sendStatus(STATUS_CODE.NO_CONTENT);
	} catch (error) {
		console.error(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

export { createShortenUrl, getUrlById, redirectToUrl, deleteUrlById };
