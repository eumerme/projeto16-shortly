import { connection } from "../database/db.js";
import { TABLE } from "../enums/tables.js";

async function selectUserToken(userId, token) {
	return connection.query(
		`SELECT * FROM ${TABLE.SESSIONS} WHERE "userId" = $1 AND token = $2 AND valid = TRUE;`,
		[userId, token]
	);
}

async function deleteUserFromSessions(token) {
	return connection.query(`DELETE FROM ${TABLE.SESSIONS} WHERE token = $1;`, [
		token,
	]);
}

async function selectUserByEmail(email) {
	return connection.query(`SELECT * FROM ${TABLE.USERS} WHERE email = $1;`, [
		email,
	]);
}

async function insertUserIntoUsers(name, email, password_hash) {
	return connection.query(
		`INSERT INTO ${TABLE.USERS} (name, email, password) VALUES ($1, $2, $3);`,
		[name, email, password_hash]
	);
}

async function selectUserFromSessions(userId) {
	return connection.query(
		`SELECT * FROM ${TABLE.SESSIONS} WHERE "userId" = $1;`,
		[userId]
	);
}

async function insertUserIntoSessions(userId, token) {
	return connection.query(
		`INSERT INTO ${TABLE.SESSIONS} ("userId", token) VALUES ($1, $2);`,
		[userId, token]
	);
}

export {
	selectUserToken,
	deleteUserFromSessions,
	selectUserByEmail,
	insertUserIntoUsers,
	selectUserFromSessions,
	insertUserIntoSessions,
};
