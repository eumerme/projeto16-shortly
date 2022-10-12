import { Router } from "express";
import {
	createShortenURL,
	deleteURLById,
	getURLById,
	redirectToURL,
} from "../controllers/urls.controller.js";
import { tokenValidation } from "../middlewares/token.validantion.js";
import {
	URLBodyValidation,
	URLIdValidation,
} from "../middlewares/urls.middleware.js";

const urlsRouter = Router();

urlsRouter.post(
	"/urls/shorten",
	tokenValidation,
	URLBodyValidation,
	createShortenURL
);
urlsRouter.get("/urls/:id", getURLById);
urlsRouter.get("/urls/open/:shortUrl", redirectToURL);
urlsRouter.delete("/urls/:id", tokenValidation, URLIdValidation, deleteURLById);

export { urlsRouter };
