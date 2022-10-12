import { Router } from "express";
import { signin, signup } from "../controllers/auth.controller.js";
import {
	signinBodyValidation,
	signupBodyValidation,
} from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/signup", signupBodyValidation, signup);
authRouter.post("/signin", signinBodyValidation, signin);

export { authRouter };
