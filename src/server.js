import express from "express";
import cors from "cors";
import { connection } from "./database/db.js";
import dotenv from "dotenv";
dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.get("/status", async (req, res) => {
	const teste = await connection.query(`SELECT * FROM users;`);
	res.send(teste);
});

server.listen(process.env.PORT, () =>
	console.log(`Server is listening on port ${process.env.PORT}`)
);
