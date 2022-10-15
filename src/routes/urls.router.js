import { Router } from "express";
import {
	createShortenUrl,
	deleteUrlById,
	getUrlById,
	redirectToUrl,
} from "../controllers/urls.controller.js";
import { tokenValidation } from "../middlewares/token.validantion.js";
import {
	urlBodyValidation,
	urlIdValidation,
} from "../middlewares/urls.middleware.js";
import { schemasValidation } from "../middlewares/schemas.validation.js";

const urlsRouter = Router();

urlsRouter.post(
	"/urls/shorten",
	tokenValidation,
	urlBodyValidation,
	createShortenUrl
);
urlsRouter.get("/urls/:id", schemasValidation, getUrlById);
urlsRouter.get("/urls/open/:shortUrl", schemasValidation, redirectToUrl);
urlsRouter.delete(
	"/urls/:id",
	tokenValidation,
	schemasValidation,
	urlIdValidation,
	deleteUrlById
);

export { urlsRouter };
