import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { validate } from "../middleware/validation.middleware";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/register",
  validate(authController.registerSchema),
  authController.register,
);
router.post(
  "/login",
  validate(authController.loginSchema),
  authController.login,
);
router.get("/me", authenticate, authController.getMe);

export default router;
