import { Router } from "express";
import { signin, signup } from "../controllers/auth.controller.js";
import {
	validadeSigninBody,
	validadeSignupBody,
} from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/signup", validadeSignupBody, signup);
authRouter.post("/signin", validadeSigninBody, signin);

export { authRouter };
