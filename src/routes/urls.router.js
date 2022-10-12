import { Router } from "express";
import {
	createShortenURL,
	getURLById,
	redirectToURL,
} from "../controllers/urls.controller.js";
import { tokenValidation } from "../middlewares/token.validantion.js";
import { urlBodyValidation } from "../middlewares/urls.middleware.js";

const urlsRouter = Router();

urlsRouter.post(
	"/urls/shorten",
	tokenValidation,
	urlBodyValidation,
	createShortenURL
);
urlsRouter.get("/urls/:id", getURLById);
urlsRouter.get("/urls/open/:shortUrl", redirectToURL);

export { urlsRouter };
