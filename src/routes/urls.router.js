import { Router } from "express";
import {
	createShortenURL,
	deleteURLById,
	getURLById,
	redirectToURL,
} from "../controllers/urls.controller.js";
import { tokenValidation } from "../middlewares/token.validantion.js";
import * as validate from "../middlewares/urls.middleware.js";

const urlsRouter = Router();

urlsRouter.post(
	"/urls/shorten",
	tokenValidation,
	validate.urlBody,
	createShortenURL
);
urlsRouter.get("/urls/:id", validate.paramsId, getURLById);
urlsRouter.get("/urls/open/:shortUrl", validate.paramsShortUrl, redirectToURL);
urlsRouter.delete(
	"/urls/:id",
	tokenValidation,
	validate.paramsId,
	validate.urlId,
	deleteURLById
);

export { urlsRouter };
