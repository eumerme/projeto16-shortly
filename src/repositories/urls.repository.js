import { connection } from "../database/db.js";
import { TABLE } from "../enums/tables.js";

async function selectUrlById(id) {
	return connection.query(
		`SELECT id, "shortUrl", url FROM ${TABLE.URLS} WHERE id = $1;`,
		[id]
	);
}

async function selectUrlByIdandUserId(id, userId) {
	return connection.query(
		`SELECT * FROM ${TABLE.URLS} WHERE id = $1 AND "userId" = $2;`,
		[id, userId]
	);
}

async function insertUrlIntoUrls(userId, url, shortUrl) {
	return connection.query(
		`INSERT INTO ${TABLE.URLS} ("userId", url, "shortUrl") VALUES ($1, $2, $3);`,
		[userId, url, shortUrl]
	);
}

async function selectUrlByShortUrl(shortUrl) {
	return connection.query(
		`SELECT url FROM ${TABLE.URLS} WHERE "shortUrl" = $1;`,
		[shortUrl]
	);
}

async function updateVisitCount(shortUrl) {
	return connection.query(
		`UPDATE ${TABLE.URLS} SET "visitCount" = ("visitCount" + 1) WHERE "shortUrl" = $1;`,
		[shortUrl]
	);
}

async function deleteUrlFromUrls(id) {
	return connection.query(`DELETE FROM ${TABLE.URLS} WHERE id = $1`, [id]);
}

export {
	selectUrlById,
	selectUrlByIdandUserId,
	insertUrlIntoUrls,
	selectUrlByShortUrl,
	updateVisitCount,
	deleteUrlFromUrls,
};
