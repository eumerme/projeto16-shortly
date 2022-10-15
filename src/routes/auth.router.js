import { Router } from "express";
import { signin, signup } from "../controllers/auth.controller.js";
import { userValidation } from "../middlewares/auth.middleware.js";
import { schemasValidation } from "../middlewares/schemas.validation.js";

const authRouter = Router();

authRouter.post("/signup", schemasValidation, userValidation, signup);
authRouter.post("/signin", schemasValidation, userValidation, signin);

export { authRouter };
