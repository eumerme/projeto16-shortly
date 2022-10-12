import { connection } from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { TABLE } from "../enums/tables.js";
import { nanoid } from "nanoid";

async function shortenURL(req, res) {
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

export { shortenURL };
