import { connection } from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { TABLE } from "../enums/tables.js";
import { nanoid } from "nanoid";

async function createShortenURL(req, res) {
	const { userId } = res.locals;
	const { url } = req.body;
	const shortUrl = nanoid(8);

	try {
		await connection.query(
			`INSERT INTO ${TABLE.URLS} ("userId", url, "shortUrl") VALUES ($1, $2, $3);`,
			[userId, url, shortUrl]
		);
		return res.status(STATUS_CODE.CREATED).send({ shortUrl });
	} catch (error) {
		console.error(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

async function getURLById(req, res) {
	const { id } = req.params;

	try {
		const { rows: url } = await connection.query(
			`SELECT id, "shortUrl", url FROM ${TABLE.URLS} WHERE id = $1;`,
			[id]
		);
		if (url.length === 0) {
			return res.sendStatus(STATUS_CODE.NOT_FOUND);
		}
		return res.status(STATUS_CODE.OK).send(url[0]);
	} catch (error) {
		console.error(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

export { createShortenURL, getURLById };
