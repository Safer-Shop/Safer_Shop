import { Router } from "express";
import { login, register, verify, resend } from "./auth.controller";

import { bodyValidate } from "@/core/middleware/body-validate";
import { errorHandler } from "@/core/middleware/error-handler";
import { LoginSchema, RegisterSchema, ResendSchema, VerifySchema } from "./auth.schema";

const router = Router();

router.post("/register", bodyValidate(RegisterSchema), register);
router.post("/verify", bodyValidate(VerifySchema), verify);
router.post("/login", bodyValidate(LoginSchema), login);
router.post("/resend", bodyValidate(ResendSchema), resend);

router.use(errorHandler);
export default router;
