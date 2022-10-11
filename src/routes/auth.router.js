import { Router } from "express";
import { signup } from "../controllers/auth.controller.js";
import { validadeSignupBody } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/signup", validadeSignupBody, signup);

export { authRouter };
