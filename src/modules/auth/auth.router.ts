import { Router } from "express";
import { login, register } from "./auth.controller";

import { bodyValidate } from "@/core/middleware/body-validate";
import { errorHandler } from "@/core/middleware/error-handler";
import { LoginSchema } from "./auth.schema";

const router = Router();

router.post("/login", bodyValidate(LoginSchema), login);
router.post("/register", register
)

router.use(errorHandler);
export default router;
