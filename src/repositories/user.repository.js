import { connection } from "../database/db.js";
import { TABLE } from "../enums/tables.js";

async function selectUserData(userId) {
	return connection.query(
		`SELECT ${TABLE.USERS}.id
            , ${TABLE.USERS}.name
            , COALESCE(SUM(${TABLE.URLS}."visitCount"), 0) AS "visitCount"
            , json_agg(json_build_object(
                'id', ${TABLE.URLS}.id
                , 'shortUrl', ${TABLE.URLS}."shortUrl"  
                , 'url', ${TABLE.URLS}.url
                , 'visitCount', ${TABLE.URLS}."visitCount"
            )) AS "shortenedUrls"
        FROM ${TABLE.USERS}
        LEFT JOIN ${TABLE.URLS} ON ${TABLE.USERS}.id = ${TABLE.URLS}."userId"
        WHERE ${TABLE.USERS}.id = $1
        GROUP BY ${TABLE.USERS}.id;`,
		[userId]
	);
}

async function listRanking() {
	return connection.query(
		`SELECT ${TABLE.USERS}.id
            , ${TABLE.USERS}.name
            , COUNT(${TABLE.URLS}."visitCount") AS "linksCount"
            , SUM(${TABLE.URLS}."visitCount") AS "visitCount"
        FROM ${TABLE.USERS}
        JOIN ${TABLE.URLS} ON ${TABLE.USERS}.id = ${TABLE.URLS}."userId"
        GROUP BY ${TABLE.USERS}.id
        ORDER BY "visitCount" DESC
        LIMIT 10;`
	);
}

export { selectUserData, listRanking };
