import { Router } from "express";
import { getRanking, getUserData } from "../controllers/user.controller.js";
import { tokenValidation } from "../middlewares/token.validantion.js";

const userRouter = Router();

userRouter.get("/users/me", tokenValidation, getUserData);
userRouter.get("/ranking", getRanking);

export { userRouter };
