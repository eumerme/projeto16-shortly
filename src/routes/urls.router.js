import { Router } from "express";
import * as urlsController from "../controllers/urls.controller.js";
import { tokenValidation } from "../middlewares/token.validation.js";
import * as urlsMiddleware from "../middlewares/urls.middleware.js";
import { schemasValidation } from "../middlewares/schemas.validation.js";

const urlsRouter = Router();

urlsRouter.post(
	"/urls/shorten",
	tokenValidation,
	urlsMiddleware.urlBodyValidation,
	urlsController.createShortenUrl
);
urlsRouter.get("/urls/:id", schemasValidation, urlsController.getUrlById);
urlsRouter.get(
	"/urls/open/:shortUrl",
	schemasValidation,
	urlsController.redirectToUrl
);
urlsRouter.delete(
	"/urls/:id",
	tokenValidation,
	schemasValidation,
	urlsMiddleware.urlIdValidation,
	urlsController.deleteUrlById
);

export { urlsRouter };
