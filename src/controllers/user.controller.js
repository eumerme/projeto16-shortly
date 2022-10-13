import { connection } from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { TABLE } from "../enums/tables.js";

async function getUserData(req, res) {
	const { userId } = res.locals;
	try {
		const { rows: userData } = await connection.query(
			`SELECT ${TABLE.USERS}.id
                , ${TABLE.USERS}.name
                , SUM(${TABLE.URLS}."visitCount") AS "visitCount"
                , json_agg(json_build_object(
                    'id', ${TABLE.URLS}.id
                    , 'shortUrl', ${TABLE.URLS}."shortUrl"  
                    , 'url', ${TABLE.URLS}.url
                    , 'visitCount', ${TABLE.URLS}."visitCount"
                )) AS "shortenedUrls"
            FROM ${TABLE.USERS}
            JOIN ${TABLE.URLS} ON ${TABLE.USERS}.id = ${TABLE.URLS}."userId"
            WHERE ${TABLE.USERS}.id = $1
            GROUP BY ${TABLE.USERS}.id
            ;`,
			[userId]
		);
		if (userData.length === 0) {
			return res.sendStatus(STATUS_CODE.NOT_FOUND);
		}
		return res.status(STATUS_CODE.OK).send(userData[0]);
	} catch (error) {
		console.error(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

async function getRanking(req, res) {
	try {
		const { rows: ranking } = await connection.query(
			`SELECT ${TABLE.USERS}.id
                , ${TABLE.USERS}.name
                , COUNT(${TABLE.URLS}."visitCount") AS "linksCount"
                , SUM(${TABLE.URLS}."visitCount") AS "visitCount"
            FROM ${TABLE.USERS}
            JOIN ${TABLE.URLS} ON ${TABLE.USERS}.id = ${TABLE.URLS}."userId"
            GROUP BY ${TABLE.USERS}.id
            ORDER BY "visitCount" DESC
            LIMIT 10
            ;`
		);
		return res.status(STATUS_CODE.OK).send(ranking);
	} catch (error) {
		console.error(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

export { getUserData, getRanking };
