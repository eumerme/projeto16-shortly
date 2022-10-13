import { connection } from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { TABLE } from "../enums/tables.js";

async function getUserData(req, res) {
	const { userId } = res.locals;
	try {
		const { rows: userData } = await connection.query(
			`SELECT users.id
                , users.name
                , SUM(urls."visitCount") AS "visitCount"
                , json_agg(json_build_object(
                    'id', urls.id
                    , 'shortUrl', urls."shortUrl"  
                    , 'url', urls.url
                    , 'visitCount', urls."visitCount"
                )) AS "shortenedUrls"
            FROM users
            JOIN urls ON users.id = urls."userId"
            WHERE users.id = $1
            GROUP BY users.id
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

export { getUserData };
