import { Router } from "express";
import { userController } from "../controllers";
import {
  validateUpdateJwtToken,
  validateUserSignIn,
  validateUserSignUp,
} from "../validators";
import { authMiddleware } from "../middlewares";

const router = Router();

router.post("/signin", validateUserSignIn, userController.login);
router.post("/signup", validateUserSignUp, userController.register);
router.get("/info", authMiddleware, userController.getUserInfo);
router.post(
  "/signin/new_token",
  validateUpdateJwtToken,
  userController.updateJwtToken
);
router.post("/logout", authMiddleware, userController.logout);

export { router as userRouter };
export default router;
