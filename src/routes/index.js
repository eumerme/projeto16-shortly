import { Router } from "express";
import { authRouter } from "./auth.router.js";
import { urlsRouter } from "./urls.router.js";

const router = Router();

router.use(authRouter);
router.use(urlsRouter);

export { router };
