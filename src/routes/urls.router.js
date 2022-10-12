import { Router } from "express";
import { shortenURL } from "../controllers/urls.controller.js";
import { tokenValidation } from "../middlewares/token.validantion.js";
import { urlBodyValidation } from "../middlewares/urls.middleware.js";

const urlsRouter = Router();

urlsRouter.post(
	"/urls/shorten",
	tokenValidation,
	urlBodyValidation,
	shortenURL
);

export { urlsRouter };
