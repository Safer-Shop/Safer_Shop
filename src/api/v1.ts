import { Router } from "express";

import { authRouter } from "../modules";

const router = Router();

router.use("/auth", authRouter);

export default router;
