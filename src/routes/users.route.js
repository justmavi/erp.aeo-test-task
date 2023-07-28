import { Router } from "express";
import { userController } from "../controllers";
import { validateUserSignIn, validateUserSignUp } from "../validators";

const router = Router();

router.post("/signin", validateUserSignIn, userController.login);
router.post("/signup", validateUserSignUp, userController.register);
router.get("/info", userController.getUserInfo);

export { router as userRouter };
export default router;
